import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import secondaryTheme from '../../secondaryTheme';
import { ThemeProvider } from '@mui/material/styles';

import '../../App.css';
import './EndResult.css';

const Passed = ({ onReset, onAnswersCheck, onSetStep, origLength, time }) => {
  return (
    <ThemeProvider theme={secondaryTheme}>
      <div className='end'>
        <Typography variant='h4' style={{ marginBottom: 36 }}>
          Snyggt!
        </Typography>

        <Typography
          variant='body1'
          style={{
            marginBottom: 36,
            textAlign: 'center',
          }}
        >
          <span className='highlight-warning'> Dina fel är rättade! </span>
          Du kan välja att gå vidare, men det är bäst att
          <span className='highlight-warning'> repetera</span> samma frågor
          igen!
        </Typography>

        <Typography color='primary' variant='h5' style={{ marginBottom: 12 }}>
          {origLength} / {origLength} {''} Rätt
        </Typography>

        <Typography
          variant='h6'
          style={{ cursor: 'pointer' }}
          color='primary'
          onClick={onAnswersCheck}
        >
          Visa dina svar
          <i className='fas fa-info-circle'></i>
        </Typography>

        <div className='buttons'>
          <Button
            style={{
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 6,
              marginTop: 6,
            }}
            variant='contained'
            color='primary'
            onClick={() => onSetStep(4)}
          >
            <span className='diffSpan'>Fortsätt</span>
          </Button>
          <Button
            style={{
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 6,
              marginTop: 6,
            }}
            variant='outlined'
            color='primary'
            onClick={onReset}
          >
            Hemskärm
          </Button>
        </div>

        <Typography variant='h6'>Tid: {time}s</Typography>
      </div>
    </ThemeProvider>
  );
};

export default Passed;
