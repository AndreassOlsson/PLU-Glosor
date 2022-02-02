import React from 'react';

import '../../App.css';
import '../../Components.css';

const Start = ({
  onQuizStart,
  difficulty,
  onSetDifficulty,
  onPreviewCheck,
}) => {
  const changeHandler = (e) => {
    onSetDifficulty(e.target.valueAsNumber);
  };

  return (
    <div className='content-standard'>
      <h3 className='header-xl'>Välkommen</h3>
      <p className='textfield'>
        Det här är en quiz på PLU-Koder som gör dig redo för kassan! Välj bara{' '}
        {''}
        <span className='highlight primary'>svårighetsgrad</span> och
        <span className='highlight primary'> starta quizen!</span>
      </p>

      <div className='diffSelection'>
        <input
          type='range'
          value={difficulty}
          min={1}
          max={3}
          step={1}
          onChange={changeHandler}
        />
        <div className='diffSelection-labels'>
          <p
            className={
              difficulty === 1
                ? 'highlight primary-darker interactive adjustLeftLabel'
                : 'discrete interactive adjustLeftLabel'
            }
            onClick={() => onSetDifficulty(1)}
          >
            AMATÖR
          </p>
          <p
            className={
              difficulty === 2
                ? 'highlight primary-darker interactive'
                : 'discrete interactive'
            }
            onClick={() => onSetDifficulty(2)}
          >
            VETERAN
          </p>
          <p
            className={
              difficulty === 3
                ? 'highlight primary-darker interactive adjustRightLabel'
                : 'discrete interactive adjustRightLabel'
            }
            onClick={() => onSetDifficulty(3)}
          >
            PLU-GENI
          </p>
        </div>
      </div>

      <div className='btns'>
        <button className='btn-contained' onClick={onQuizStart}>
          STARTA QUIZ
        </button>
        <button className='btn-outlined' onClick={onPreviewCheck}>
          VISA FRÅGOR
        </button>
      </div>
    </div>
  );
};

export default Start;
