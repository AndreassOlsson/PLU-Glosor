import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Theme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';

import '../../App.css';
import './EndResult.css';

const Failure = ({
  results,
  wrongAnswers,
  data,
  onRetry,
  onReset,
  onAnswersCheck,
  origLength,
  firstTry,
  time,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [retryAnswers, setRetryAnswers] = useState(0);

  useEffect(() => {
    let questionAmount = data.length;
    let errors = 0;

    wrongAnswers.forEach((wrongAnswer) => {
      if (wrongAnswer !== 0) {
        errors += 1;
      }
    });

    let rightAnswersCount = questionAmount - errors;
    let retryAnswersCount = origLength - errors;

    setCorrectAnswers(rightAnswersCount);
    setRetryAnswers(retryAnswersCount);
  }, [wrongAnswers, origLength, data, results]);

  return (
    <ThemeProvider theme={Theme}>
      <div className='end'>
        <Typography variant='h4' style={{ marginBottom: 36 }}>
          Nästa sitter!
        </Typography>

        {correctAnswers !== data.length && (
          <Typography
            variant='body1'
            style={{
              marginBottom: 36,
              textAlign: 'center',
            }}
          >
            Du fick {''}
            <span className='highlight-danger'>
              {retryAnswers} av {origLength} rätt
            </span>{' '}
            så du är inte redo att gå vidare riktigt än.{' '}
            <span className='highlight-danger'>Rätta dina fel</span> så lär du
            dig snabbare!
          </Typography>
        )}

        <Typography color='error' variant='h5' style={{ marginBottom: 12 }}>
          {retryAnswers} / {origLength} {''} Rätt
        </Typography>

        <Typography
          variant='h6'
          style={{ cursor: 'pointer' }}
          color='error'
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
            color='secondary'
            onClick={onRetry}
          >
            <span className='diffSpan'>Öva på fel</span>
            <span className='subtle'>
              ({Math.floor(data.length - correctAnswers)})
            </span>
          </Button>
          <Button
            style={{
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 6,
              marginTop: 6,
            }}
            variant='outlined'
            color='secondary'
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

export default Failure;
