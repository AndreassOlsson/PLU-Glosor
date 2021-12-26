import React, { useState, useEffect, useRef, Fragment } from 'react';

import '../../App.css';
import './Question.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Question = ({
  data,
  Data,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
  difficulty,
  onSetWrongAnswers,
  wrongAnswers,
  showAlert,
  onSetShowAlert,
  allQuestions,
  wrongAnswersIndexes,
  onSetWrongAnswersIndexes,
  onSetQuizPassed,
}) => {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [randomChoices, setRandomChoices] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');
  const radiosWrapper = useRef();

  useEffect(() => {
    if (difficulty === 1) {
      getRandomChoices();
      const findCheckedInput =
        radiosWrapper.current.querySelector('input:checked');
      if (findCheckedInput) {
        findCheckedInput.checked = false;
      }
    }
    if (difficulty === 2) {
      handlePlaceHolder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, difficulty]);

  // DIFFICULTY
  const handleClick = (e) => {
    setSelected(e.target.value);
    if (e.target.value === data.answer || selected === data.answer) {
      setSubmitted(true);
      setTimeout(() => {
        nextQuestion();
      }, 750);
    } else {
      let index = allQuestions.indexOf(data);
      if (!wrongAnswersIndexes.includes(index)) {
        onSetWrongAnswersIndexes([...wrongAnswersIndexes, index]);
      }
      wrongAnswers.splice(activeQuestion, 1, e.target.value);
      onSetWrongAnswers(wrongAnswers);
      onSetQuizPassed(false);
      setTimeout(() => {
        setSubmitted(true);
        nextQuestion();
      }, 750);
    }
  };

  const isMobile = () => {
    if (window.screen.width < 600) {
      return 'optionLabel';
    } else {
      return 'optionLabel before';
    }
  };

  const handleClassNameLabels = (i, choice) => {
    // ALL CHOICES BEFORE SELECTED ANSWER AND BEFORE WRONG ANSWER

    let labelClassName = isMobile();

    if (
      selected === choice &&
      wrongAnswers[activeQuestion] !== choice &&
      wrongAnswers[activeQuestion] === 0
    ) {
      // SELECTED CHOICE BEFORE AND AFTER WRONG ANSWER
      labelClassName = `optionLabel  borderNone`;
    } else if (wrongAnswers[activeQuestion] === choice) {
      // THE WRONG ANSWER AFTER WRONG ANSWER
      labelClassName = `optionLabel  wrongAnswer`;
    } else if (
      wrongAnswers[activeQuestion] !== choice &&
      wrongAnswers[activeQuestion] !== 0
    ) {
      // NOT THE WRONG ANSWERS AFTER WRONG ANSWER
      labelClassName = `optionLabel  borderNone`;

      // RIGHT ANSWER AFTER WRONG ANSWER
      if (choice === data.answer && wrongAnswers[activeQuestion] !== 0) {
        labelClassName = `optionLabel  rightAnswer`;
      }
    } else if (choice === selected && selected === data.answer && submitted) {
      labelClassName = `optionLabel  rightAnswer`;
    } else if (selected !== choice && selected === data.answer && submitted) {
      labelClassName = `optionLabel  borderNone`;
    }
    return labelClassName;
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomChoices = () => {
    let randomIndexes = [];
    let batch = [];

    batch.push(data.answer);

    while (randomIndexes.length !== 3) {
      let randomIndex = Math.floor(Math.random() * Data.data.length);
      if (
        Data.data[randomIndex].answer !== data.answer &&
        randomIndexes.includes(randomIndex) !== true
      ) {
        randomIndexes.push(randomIndex);
        batch.push(Data.data[randomIndex].answer);
      }
    }

    setRandomChoices(shuffle(batch));
  };

  // DIFFICULTY 2 & 3
  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  };

  const nextClickHandler = (e) => {
    setSubmitted(true);
    if (selected === '') {
      return setError('Svara På Frågan!');
    }
    if (selected === data.answer) {
      nextQuestion();
    } else if (wrongAnswers.length <= numberOfQuestions) {
      let index = allQuestions.indexOf(data);
      if (!wrongAnswersIndexes.includes(index)) {
        onSetWrongAnswersIndexes([...wrongAnswersIndexes, index]);
      }
      wrongAnswers.splice(activeQuestion, 1, selected);
      onSetWrongAnswers(wrongAnswers);
      onSetQuizPassed(false);
      setAlert('Skriv in rätt svar för att fortsätta!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      nextClickHandler();
    }
  };

  const handlePlaceHolder = () => {
    let randomIndexes = [];
    let replaceCount = 0;
    let str = data.answer;

    if (data.answer.length !== 2) {
      replaceCount = 2;
    } else {
      replaceCount = 1;
    }

    while (randomIndexes.length !== replaceCount) {
      let randomIndex = Math.floor(Math.random() * data.answer.length);
      if (randomIndexes.includes(randomIndex) !== true) {
        randomIndexes.push(randomIndex);
      }
    }

    for (let i = 0; i < randomIndexes.length; i++) {
      str =
        str.slice(0, randomIndexes[i]) + '-' + str.slice(randomIndexes[i] + 1);
    }
    setPlaceHolder(str);
  };

  // ALL DIFFICULTIES
  const nextQuestion = (e) => {
    getRandomChoices();
    setSelected('');
    setAlert('');
    setSubmitted(false);
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  return (
    <Fragment>
      <div className='question'>
        <Typography
          variant='body2'
          style={{ marginTop: 12, marginBottom: 12 }}
          color='primary'
        >
          FRÅGA {`${activeQuestion + 1} / ${numberOfQuestions}`}
        </Typography>
        <input
          type='range'
          value={activeQuestion}
          min={0}
          max={numberOfQuestions}
          step={1}
          readOnly
        />

        <div className='handleLongWord'>
          <Typography variant='h4'>{data.question}</Typography>
        </div>

        <img src={data.imgLink} alt='test' />
        {difficulty === 1 && (
          <Fragment>
            <div ref={radiosWrapper} className='options'>
              {randomChoices.map((choice, i) => (
                <label key={i} className={handleClassNameLabels(i, choice)}>
                  <input
                    className='optionInput'
                    type='radio'
                    name='answer'
                    value={choice}
                    onClick={(e) => handleClick(e)}
                  />
                  <div
                    className={
                      wrongAnswers[activeQuestion] !== 0
                        ? 'choice'
                        : 'choice choiceNotWrong'
                    }
                  >
                    {choice}
                  </div>
                </label>
              ))}
            </div>
          </Fragment>
        )}
        {difficulty === 2 && (
          <div>
            {wrongAnswers[activeQuestion] !== 0 ? (
              <TextField
                label='PLU-Kod'
                color='secondary'
                placeholder={data.answer}
                value={selected}
                onChange={changeHandler}
                onKeyPress={handleKeyPress}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                autoFocus
              ></TextField>
            ) : (
              <TextField
                label='PLU-Kod'
                color='primary'
                placeholder={placeHolder}
                value={selected}
                onChange={changeHandler}
                onKeyPress={handleKeyPress}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                autoFocus
              ></TextField>
            )}
            {wrongAnswers[activeQuestion] !== 0 && (
              <div className='facit'>
                <Typography variant='body2' className='flexColumn'>
                  Ditt Svar: {''}
                  <span className='highlight-danger mL'>
                    {wrongAnswers[activeQuestion]}
                  </span>
                </Typography>
                <Typography variant='body2' className='flexColumn'>
                  Rätt Svar: {''}
                  <span className='highlight mL'> {data.answer}</span>
                </Typography>
              </div>
            )}
          </div>
        )}
        {difficulty === 3 && (
          <div>
            {wrongAnswers[activeQuestion] !== 0 ? (
              <TextField
                label='PLU-Kod'
                color='secondary'
                value={selected}
                onChange={changeHandler}
                onKeyPress={handleKeyPress}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                autoFocus
              ></TextField>
            ) : (
              <TextField
                label='PLU-Kod'
                color='primary'
                value={selected}
                onChange={changeHandler}
                onKeyPress={handleKeyPress}
                type='number'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                autoFocus
              ></TextField>
            )}
            {wrongAnswers[activeQuestion] !== 0 && (
              <div className='facit'>
                <Typography variant='body2' className='flexColumn'>
                  Ditt Svar: {''}
                  <span className='highlight-danger mL'>
                    {wrongAnswers[activeQuestion]}
                  </span>
                </Typography>
                <Typography variant='body2' className='flexColumn'>
                  Rätt Svar: {''}
                  <span className='highlight mL'> {data.answer}</span>
                </Typography>
              </div>
            )}
          </div>
        )}
        {error && <div>{error}</div>}
        {difficulty !== 1 && (
          <Button
            style={{ marginTop: 24 }}
            variant='contained'
            color='primary'
            onClick={nextClickHandler}
          >
            {wrongAnswers[activeQuestion] !== 0 ? 'Vidare' : 'Svara'}
          </Button>
        )}
      </div>
      <span className={showAlert ? 'alert' : 'alert closeAlert'}>
        {alert}
        <i
          className={
            alert !== ''
              ? 'fas fa-times alert'
              : 'fas fa-times alert closeAlert'
          }
          onClick={(e) => onSetShowAlert(false)}
        ></i>
      </span>
    </Fragment>
  );
};

export default Question;
