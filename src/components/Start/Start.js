import React, { Fragment } from 'react';
import Textbox from '../Layout/Textbox';

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
    <Fragment>
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
      <div className='content-flexwrap'>
        <Textbox
          header='Syftet med PLU Glosor'
          text={
            <Fragment>
              Syftet med PLU Glosor är att göra det
              <span className='highlight primary'> lätt och roligt</span> att
              lära sig
              <span className='highlight primary'> PLU koder!</span> Ett
              kassabiträde blir mer effektiv av att memorisera de viktigaste PLU
              koderna!
            </Fragment>
          }
        />
        <Textbox img={'Yessir'} />
        <Textbox
          header='Vad är en PLU Kod?'
          text={
            <Fragment>
              En PLU Kod motsvarar en
              <span className='highlight primary'> vara utan streckkod. </span>
              När en sådan vara dyker upp i kassan så måste kassabiträdet
              <span className='highlight primary'> skriva in koden!</span>
            </Fragment>
          }
        />
      </div>
    </Fragment>
  );
};

export default Start;
