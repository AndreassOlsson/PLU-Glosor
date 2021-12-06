import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import '../../App.css';
import './Start.css';

const Start = ({
  onQuizStart,
  difficulty,
  onSetDifficulty,
  length,
  onPreviewCheck,
}) => {
  const changeHandler = (e) => {
    onSetDifficulty(e.target.valueAsNumber);
  };

  return (
    <div className='start'>
      <Typography variant='h3' style={{ marginBottom: 50 }}>
        Välkommen
      </Typography>
      <Typography
        variant='body1'
        style={{
          marginBottom: 12,
          textAlign: 'center',
          maxWidth: 550,
        }}
      >
        Det här är en quiz på PLU-Koder som gör dig redo för kassan! Välj bara{' '}
        {''}
        <span className='highlight'>svårighetsgrad</span> och
        <span className='highlight'> starta quizen!</span>
      </Typography>

      <div className='difficulty'>
        <input
          type='range'
          value={difficulty}
          min={1}
          max={3}
          step={1}
          onChange={changeHandler}
        />
        <ul className='labels'>
          <li
            className={difficulty === 1 ? 'selectedDiff' : 'nonSelectedDiff'}
            onClick={() => onSetDifficulty(1)}
          >
            Nybörjare
          </li>
          <li
            className={difficulty === 2 ? 'selectedDiff' : 'nonSelectedDiff'}
            onClick={() => onSetDifficulty(2)}
          >
            Rutinerad
          </li>
          <li
            className={difficulty === 3 ? 'selectedDiff' : 'nonSelectedDiff'}
            onClick={() => onSetDifficulty(3)}
          >
            Proffs
          </li>
        </ul>
      </div>

      <Button
        style={{ marginTop: 12 }}
        variant='contained'
        color='primary'
        onClick={onQuizStart}
      >
        <span className='diffSpan'>Starta Quiz</span>
        <span className='subtle'>({length})</span>
      </Button>
      <Button
        style={{
          marginRight: 3,
          marginLeft: 3,
          marginBottom: 6,
          marginTop: 8,
        }}
        variant='outlined'
        color='primary'
        onClick={onPreviewCheck}
      >
        Visa frågor
      </Button>
    </div>
  );
};

export default Start;
