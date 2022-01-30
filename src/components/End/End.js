import React, { Fragment, useState, useEffect } from 'react';
import QuestionChanger from './QuestionChanger';

import '../../App.css';
import '../../Components.css';

const End = ({
  difficulty,
  origLength,
  maxQuestions,
  firstTry,
  quizPassed,
  wrongAnswers,
  onRestart,
  onRetry,
  onAnswersCheck,
  onSetDifficulty,
  onSetBatchSize,
  onQuizStart,
  onSetBg,
}) => {
  const [viewQuestionChanger, setViewQuestionChanger] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState(0);

  useEffect(() => {
    let errors = 0;
    wrongAnswers.forEach((wrongAnswer) => {
      if (wrongAnswer !== 0) {
        errors += 1;
      }
    });
    let correctAnswersCount = origLength - errors;
    setcorrectAnswers(correctAnswersCount);
  }, [wrongAnswers, origLength]);

  const advance = () => {
    if (difficulty < 3) {
      onSetDifficulty(difficulty + 1);
      onRestart();
    } else {
      onRestart();
    }
  };
  const newQuestions = () => {
    onSetDifficulty(1);
    onSetBatchSize(origLength);
    onQuizStart();
  };
  const handleClassNameHeader = () => {
    if (firstTry && quizPassed) {
      return 'header-xl primary interactive';
    } else if (!firstTry && quizPassed) {
      return 'header-xl warning interactive';
    } else if (!quizPassed) {
      return 'header-xl danger interactive';
    }
  };
  const handleClassNameBTNContained = () => {
    if (firstTry && quizPassed) {
      return 'btn-contained';
    } else if (!firstTry && quizPassed) {
      return 'btn-contained btn-contained-warning';
    } else if (!quizPassed) {
      return 'btn-contained btn-contained-danger';
    }
  };
  const handleClassNameBTNOutlined = () => {
    if (firstTry && quizPassed) {
      return 'btn-outlined';
    } else if (!firstTry && quizPassed) {
      return 'btn-outlined btn-outlined-warning';
    } else if (!quizPassed) {
      return 'btn-outlined btn-outlined-danger';
    }
  };

  const handleClicksBTNContained = () => {
    if (firstTry && quizPassed && difficulty !== 3) {
      return () => advance();
    } else if (firstTry && quizPassed && difficulty === 3) {
      return () => newQuestions();
    } else if (!firstTry && quizPassed) {
      return () => onRestart();
    } else if (!quizPassed) {
      return () => onRetry();
    }
  };
  // Solve warning: "Cannot update a component from inside thhe function body of a different component"
  useEffect(() => {
    if (firstTry && quizPassed && difficulty !== 3) {
      onSetBg('bg1');
    } else if (firstTry && quizPassed && difficulty === 3) {
      onSetBg('bg1');
    } else if (!firstTry && quizPassed) {
      onSetBg('bg2');
    } else if (!quizPassed) {
      onSetBg('bg3');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advance, newQuestions, onRestart, onRetry]);

  const handleClassNameTrophy = () => {
    if (difficulty === 1) {
      return 'fas fa-trophy trophy-bronze';
    }
    if (difficulty === 2) {
      return 'fas fa-trophy trophy-silver';
    }
    if (difficulty === 3) {
      return 'fas fa-trophy trophy-gold';
    }
  };

  return (
    <Fragment>
      <div className='content-standard'>
        <h3 className='header-xl'>
          {firstTry && quizPassed && difficulty !== 3 && 'Grattis!'}
          {firstTry && quizPassed && difficulty === 3 && 'Hurra!'}
          {!firstTry && quizPassed && 'Nästan där!'}
          {!quizPassed && (
            <Fragment>
              MÅ GUD{' '}
              <span className='highlight danger text-shadow-danger'>
                BESTRAFFA
              </span>{' '}
              DIG
            </Fragment>
          )}
        </h3>
        <p className='textfield'>
          {firstTry && quizPassed && difficulty !== 3 && (
            <Fragment>
              {' '}
              Du fick <span className='highlight primary'>alla rätt</span> på
              quizen och är redo för nya utmaningar. Ändra frågor eller gå
              vidare till{' '}
              <span className='highlight primary'> nästa nivå!</span>
            </Fragment>
          )}
          {firstTry && quizPassed && difficulty === 3 && (
            <Fragment>
              {' '}
              Nu är du <span className='highlight primary'>proffs</span> på de
              här PLU-Koderna men det finns ännu fler att lära sig. Välj
              <span className='highlight primary'> nya frågor </span>
              för att bli ännu bättre!
            </Fragment>
          )}
          {!firstTry && quizPassed && (
            <Fragment>
              {' '}
              Du har nu{' '}
              <span className='highlight warning'>rättat dina fel</span> men det
              är bäst att
              <span className='highlight warning'> repetera quizen </span> innan
              du går vidare!
            </Fragment>
          )}
          {!quizPassed && (
            <Fragment>
              {' '}
              Du har{' '}
              <span className='highlight danger'>inte klarat quizen</span> men
              ännu är hoppet inte förlorat. Du borde
              <span className='highlight danger'> göra om dina fel </span> innan
              du går vidare!
            </Fragment>
          )}
        </p>
        <h3 className={handleClassNameHeader()} onClick={onAnswersCheck}>
          {firstTry && quizPassed && (
            <Fragment>
              <i className={handleClassNameTrophy()}></i>
              {origLength} / {origLength} {''} Rätt
              <i className={handleClassNameTrophy()}></i>
            </Fragment>
          )}
          {!firstTry && quizPassed && (
            <Fragment>
              {origLength} / {origLength} {''} Rätt
            </Fragment>
          )}
          {!quizPassed && (
            <Fragment>
              {correctAnswers} / {origLength} {''} Rätt
            </Fragment>
          )}
        </h3>
        <div className='btns'>
          <button
            className={handleClassNameBTNContained()}
            onClick={handleClicksBTNContained()}
          >
            {firstTry && quizPassed && difficulty !== 3 && 'Nästa nivå'}
            {firstTry && quizPassed && difficulty === 3 && 'Nya frågor'}
            {!firstTry && quizPassed && 'Repetera'}
            {!quizPassed && 'Gör om fel'}
          </button>
          <button
            className={handleClassNameBTNOutlined()}
            onClick={() => setViewQuestionChanger(true)}
          >
            Ändra frågor
          </button>
        </div>
      </div>
      {viewQuestionChanger && (
        <QuestionChanger
          onSetViewQuestionChanger={setViewQuestionChanger}
          origLength={origLength}
          difficulty={difficulty}
          maxQuestions={maxQuestions}
          onSetDifficulty={onSetDifficulty}
          onSetBatchSize={onSetBatchSize}
          onQuizStart={onQuizStart}
          onRestart={onRestart}
          onSetBg={onSetBg}
        />
      )}
    </Fragment>
  );
};

export default End;
