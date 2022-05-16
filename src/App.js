import React, { useState, useEffect } from 'react';
import Data from './Data.json';

import './App.css';

import Start from './components/Start/Start';
import Question from './components/Question/Question';
import End from './components/End/End';

import Preview from './components/Start/Preview';
import Result from './components/End/Result';

import Footer from './components/Layout/Footer';

function App() {
  const [step, setStep] = useState(1);
  const [batch, setBatch] = useState([]);
  const [origBatch, setOrigBatch] = useState([]);
  const [batchSize, setBatchSize] = useState(5);
  const [difficulty, setDifficulty] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswersIndexes, setWrongAnswersIndexes] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const [quizPassed, setQuizPassed] = useState(true);
  const [bg, setBg] = useState('bg1');

  // Dynamically change theme-color Meta tag
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (bg === 'bg3') {
      metaThemeColor.setAttribute('content', '#FEECEB');
    } else if (bg === 'bg2') {
      metaThemeColor.setAttribute('content', '#FCF1E5');
    } else {
      metaThemeColor.setAttribute('content', '#E5F6ED');
    }
  }, [bg]);

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

  // Fills the array with 0´s, used in wrongAnswers arr, that gets replaced by wrong answers
  const fillArray = (length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(0);
    }
    return arr;
  };

  // Starts quiz with new batch
  // BG green untill wrong answer
  const quizStartHandler = () => {
    setFirstTry(true);
    setQuizPassed(true);
    setStep(2);

    setActiveQuestion(0);
    getBatch(batchSize);
    setWrongAnswers(fillArray(batchSize));
  };

  // Restarts with original batch
  // BG orange if firstTry is false - otherwise bg green
  const restartClickHandler = () => {
    setFirstTry(true);
    setQuizPassed(true);
    setStep(2);

    setActiveQuestion(0);
    setBatch(origBatch);
    setWrongAnswers(fillArray(batchSize));
  };

  // Redo wrong answers
  // BG red since quiz is not passed
  const retryClickHandler = () => {
    setFirstTry(false);
    setQuizPassed(true);
    setStep(2);

    setActiveQuestion(0);
    getWrongAnswersBatch();
    setWrongAnswers(fillArray(wrongAnswersIndexes.length));
    setWrongAnswersIndexes([]);
  };

  // Returns to homescreen aka step === 1
  const resetClickHandler = () => {
    setStep(1);
    setDifficulty(1);
    setOrigBatch([]);
    setShowPreview(false);
    setShowResult(false);
    setBg('bg1');
  };

  return (
    <div className={'App ' + bg}>
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
          allQuestions={Data.data}
          wrongAnswersIndexes={wrongAnswersIndexes}
          onSetWrongAnswersIndexes={setWrongAnswersIndexes}
          onSetQuizPassed={setQuizPassed}
          onSetBg={setBg}
        />
      )}
      {step === 3 && (
        <End
          onReset={resetClickHandler}
          onRestart={restartClickHandler}
          onRetry={retryClickHandler}
          origLength={batchSize}
          onSetStep={setStep}
          difficulty={difficulty}
          onAnswersCheck={() => setShowResult(true)}
          onSetDifficulty={setDifficulty}
          maxQuestions={Data.data.length}
          onSetBatchSize={setBatchSize}
          onQuizStart={quizStartHandler}
          quizPassed={quizPassed}
          wrongAnswers={wrongAnswers}
          firstTry={firstTry}
          onSetBg={setBg}
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
      <Footer onReset={resetClickHandler} bg={bg} />
    </div>
  );
}

export default App;
