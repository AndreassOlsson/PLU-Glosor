import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Theme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';

import '../../App.css';
import './EndResult.css';

const End = ({
  onReset,
  onAnswersCheck,
  onSetStep,
  origLength,
  difficulty,
  time,
}) => {
  return (
    <ThemeProvider theme={Theme}>
      <div className='end'>
        <Typography variant='h4' style={{ marginBottom: 36 }}>
          {difficulty === 3 ? 'Superbra jobbat!!' : 'Bra jobbat!'}
        </Typography>

        <Typography
          variant='body1'
          style={{
            marginBottom: 36,
            textAlign: 'center',
          }}
        >
          {difficulty === 3 ? (
            <Fragment>
              {' '}
              Wow! Du fick <span className='highlight'>alla rätt</span> på den{' '}
              svåraste nivån! Nu är du <span className='highlight'>proffs</span>{' '}
              på de här frågorna och redo för nya frågor!
            </Fragment>
          ) : (
            <Fragment>
              {' '}
              Du fick
              <span className='highlight'> alla rätt</span> vilket betyder att
              du är redo att <span className='highlight'> gå vidare!</span>
            </Fragment>
          )}
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

export default End;
