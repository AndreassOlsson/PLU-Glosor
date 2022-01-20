import React, { useState, useEffect } from 'react';
import Data from './Data.json';
import Theme from './Theme';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';

import Start from './components/Start/Start';
import Question from './components/Question/Question';
import Success from './components/End/Success';
import Passed from './components/End/Passed';
import Failure from './components/End/Failure';
import QSelector from './components/QSelector/QSelector';

import Preview from './components/Start/Preview';
import Result from './components/End/Result';

let interval;

function App() {
  const [step, setStep] = useState(1);
  const [batch, setBatch] = useState([]);
  const [origBatch, setOrigBatch] = useState([]);
  const [batchSize, setBatchSize] = useState(6);
  const [difficulty, setDifficulty] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswersIndexes, setWrongAnswersIndexes] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [firstTry, setFirstTry] = useState(true);
  const [quizPassed, setQuizPassed] = useState(true);
  const [typeMobile, setTypeMobile] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  // Sets the batch to a random array from Data.json with the size of batchSize
  const getBatch = () => {
    let randomIndexes = [];
    let batch = [];

    while (randomIndexes.length !== batchSize) {
      let randomIndex = Math.floor(Math.random() * Data.data.length);
      if (randomIndexes.includes(randomIndex) !== true) {
        randomIndexes.push(randomIndex);
      }
    }

    for (let i = 0; i < randomIndexes.length; i++) {
      batch.push(Data.data[randomIndexes[i]]);
    }

    setBatch(batch);
    setOrigBatch(batch);
  };

  // Sets the batch to all questions that were answered falsely
  const getWrongAnswersBatch = () => {
    let batch = [];

    for (let i = 0; i < wrongAnswersIndexes.length; i++) {
      batch.push(Data.data[wrongAnswersIndexes[i]]);
    }

    setBatch(batch);
  };

  // Fills the array with 0´s (makeshift solution)
  const fillArray = (length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(0);
    }
    return arr;
  };

  // Only triggered from step === 1
  const quizStartHandler = () => {
    getBatch(batchSize);
    setStep(2);
    setTime(0);
    setFirstTry(true);
    setQuizPassed(true);
    setShowAlert(true);
    setActiveQuestion(0);
    setWrongAnswers(fillArray(batchSize));
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Returns to homescreen aka step === 1
  const resetClickHandler = () => {
    setStep(1);
    setDifficulty(1);
    setOrigBatch([]);
  };

  // Sets the batch to the original batch
  // Only triggered from step === 4
  const restartClickHandler = () => {
    setStep(2);
    setTime(0);
    setFirstTry(true);
    setQuizPassed(true);
    setShowAlert(true);
    setActiveQuestion(0);
    setBatch(origBatch);
    setWrongAnswers(fillArray(batchSize));
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Sets the batch to falsely answered questions
  // Only triggered from Failure.js
  const retryClickHandler = () => {
    setStep(2);
    setTime(0);
    setFirstTry(false);
    setQuizPassed(true);
    getWrongAnswersBatch();
    setShowAlert(true);
    setActiveQuestion(0);
    setWrongAnswers(fillArray(wrongAnswersIndexes.length));
    setWrongAnswersIndexes([]);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className={typeMobile ? 'App typeMobile' : 'App'}>
        {step === 1 && (
          <Start
            onQuizStart={quizStartHandler}
            difficulty={difficulty}
            onSetDifficulty={setDifficulty}
            length={batchSize}
            onPreviewCheck={() => setShowPreview(true)}
          />
        )}
        {showPreview && (
          <Preview
            onClose={() => setShowPreview(false)}
            data={Data.data}
            maxQuestions={Data.data.length}
            onSetBatchSize={setBatchSize}
            origLength={batchSize}
          />
        )}
        {step === 2 && (
          <Question
            data={batch[activeQuestion]}
            Data={Data}
            numberOfQuestions={batch.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
            step={step}
            difficulty={difficulty}
            wrongAnswers={wrongAnswers}
            onSetWrongAnswers={setWrongAnswers}
            showAlert={showAlert}
            onSetShowAlert={setShowAlert}
            allQuestions={Data.data}
            wrongAnswersIndexes={wrongAnswersIndexes}
            onSetWrongAnswersIndexes={setWrongAnswersIndexes}
            onSetQuizPassed={setQuizPassed}
            onSetTypeMobile={setTypeMobile}
          />
        )}
        {step === 3 && quizPassed && firstTry && (
          <Success
            onReset={resetClickHandler}
            onRestart={restartClickHandler}
            origLength={batchSize}
            onSetStep={setStep}
            difficulty={difficulty}
            onAnswersCheck={() => setShowResult(true)}
            time={time}
          />
        )}
        {step === 3 && quizPassed && !firstTry && (
          <Passed
            onReset={resetClickHandler}
            onRestart={restartClickHandler}
            origLength={batchSize}
            onSetStep={setStep}
            onAnswersCheck={() => setShowResult(true)}
            time={time}
          />
        )}
        {step === 3 && !quizPassed && (
          <Failure
            wrongAnswers={wrongAnswers}
            data={batch}
            onReset={resetClickHandler}
            onRetry={retryClickHandler}
            origLength={batchSize}
            firstTry={firstTry}
            onAnswersCheck={() => setShowResult(true)}
            time={time}
          />
        )}
        {step === 4 && (
          <QSelector
            data={batch}
            difficulty={difficulty}
            origLength={batchSize}
            onRestart={restartClickHandler}
            onQuizStart={quizStartHandler}
            firstTry={firstTry}
            onSetBatchSize={setBatchSize}
            maxQuestions={Data.data.length}
            onSetDifficulty={setDifficulty}
          />
        )}
        {showResult && (
          <Result
            onClose={() => setShowResult(false)}
            data={batch}
            origData={origBatch}
            firstTry={firstTry}
            wrongAnswers={wrongAnswers}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
