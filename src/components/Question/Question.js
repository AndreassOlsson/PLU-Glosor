import React, { useState, useEffect, useRef, Fragment } from 'react';

import '../../App.css';
import '../../Components.css';

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
  allQuestions,
  wrongAnswersIndexes,
  onSetWrongAnswersIndexes,
  onSetQuizPassed,
  onSetBg,
}) => {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [randomChoices, setRandomChoices] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('');
  const [error, setError] = useState('');
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
      onSetBg('bg3');
      setTimeout(() => {
        setSubmitted(true);
        nextQuestion();
      }, 750);
    }
  };

  const handleClassNameLabel = () => {
    if (window.screen.width < 600) {
      return 'optionLabel';
    } else {
      return 'optionLabel before';
    }
  };

  const handleClassNameLabels = (i, choice) => {
    // ALL CHOICES BEFORE SELECTED ANSWER AND BEFORE WRONG ANSWER

    let labelClassName = handleClassNameLabel();

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
      onSetBg('bg3');
      setSelected('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      nextClickHandler();
    }
  };

  const handlePlaceHolder = () => {
    let str = data.answer;

    if (data.answer.length !== 2) {
      str = str.slice(0, 2);
      for (let i = 0; i < data.answer.length - 2; i++) {
        str = str + '-';
      }
    } else {
      str = str.slice(0, 1) + '-';
    }

    setPlaceHolder(str);
  };

  // ALL DIFFICULTIES
  const nextQuestion = (e) => {
    getRandomChoices();
    setSelected('');
    setSubmitted(false);
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  const isMobile = () => {
    if (window.screen.width < 600) {
      return 'content-card-transparent';
    } else {
      return 'content-card';
    }
  };

  return (
    <div className={isMobile()}>
      <div className='progress-range'>
        <p className='primary p-question-count'>
          {' '}
          FRÅGA {`${activeQuestion + 1} / ${numberOfQuestions}`}
        </p>
        <input
          type='range'
          value={activeQuestion}
          min={0}
          max={numberOfQuestions}
          step={1}
          readOnly
        />
      </div>

      <h4 className='header-l header-l-question'>{data.question}</h4>
      <img src={data.imgLink} alt='Grocery' />
      {difficulty === 1 && (
        <Fragment>
          <div ref={radiosWrapper} className='multiple-choices'>
            {randomChoices.map((choice, i) => (
              <label key={i} className={handleClassNameLabels(i, choice)}>
                <input
                  className='optionInput'
                  type='radio'
                  name='answer'
                  value={choice}
                  onClick={(e) => handleClick(e)}
                />
                <p
                  className={
                    wrongAnswers[activeQuestion] !== 0
                      ? 'choice'
                      : 'choice choiceNotWrong'
                  }
                >
                  {choice}
                </p>
              </label>
            ))}
          </div>
        </Fragment>
      )}
      {(difficulty === 2 || difficulty === 3) && (
        <Fragment>
          {wrongAnswers[activeQuestion] === 0 ? (
            <input
              type='number'
              placeholder={difficulty === 2 ? placeHolder : ''}
              value={selected}
              onChange={changeHandler}
              onKeyPress={handleKeyPress}
              inputMode='numeric'
              pattern='[0-9]*'
              autoFocus={window.screen.width < 600 ? false : true}
            ></input>
          ) : (
            <input
              type='number'
              placeholder={data.answer}
              value={selected}
              onChange={changeHandler}
              onKeyPress={handleKeyPress}
              inputMode='numeric'
              pattern='[0-9]*'
              autoFocus={window.screen.width < 600 ? false : true}
            ></input>
          )}
          <div className='facit-and-button'>
            {wrongAnswers[activeQuestion] !== 0 && (
              <div className='facit'>
                <p className='facit-item'>
                  Ditt Svar: {''}
                  <span className='highlight danger'>
                    {wrongAnswers[activeQuestion]}
                  </span>
                </p>
                <p className='facit-item'>
                  Rätt Svar: {''}
                  <span className='highlight primary'>{data.answer}</span>
                </p>
              </div>
            )}
            <button
              className={
                wrongAnswers[activeQuestion] === 0
                  ? 'btn-contained btn-question-answer'
                  : 'btn-outlined'
              }
              onClick={nextClickHandler}
            >
              {wrongAnswers[activeQuestion] === 0 ? 'Svara' : 'Vidare'}
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Question;
