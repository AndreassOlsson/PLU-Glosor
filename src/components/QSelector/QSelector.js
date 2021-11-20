import React, { Fragment, useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import secondaryTheme from '../../secondaryTheme';
import { ThemeProvider } from '@mui/material/styles';

import QChanger from './QChanger';

import '../../App.css';
import './QSelector.css';

function QSelector({
  data,
  difficulty,
  origLength,
  onRestart,
  firstTry,
  onSetBatchSize,
  maxQuestions,
  onSetDifficulty,
  onQuizStart,
}) {
  const [localBatchSize, setLocalBatchSize] = useState(origLength);
  const makeShift = () => {
    if (localBatchSize === origLength && difficulty !== 3) {
      return true;
    } else {
      return false;
    }
  };
  const [useSame, setUseSame] = useState(makeShift);
  const [isChecked, setIsChecked] = useState(makeShift);

  const LCDSetup = () => {
    if (difficulty === 3 || firstTry === false) {
      return difficulty;
    } else {
      return difficulty + 1;
    }
  };

  const [localDiff, setLocalDiff] = useState(LCDSetup);
  const [showQChanger, setShowQChanger] = useState(false);

  const advance = () => {
    if (difficulty < 3) {
      onSetDifficulty(difficulty + 1);
      onRestart();
    }
  };

  return (
    <Fragment>
      {showQChanger ? (
        <QChanger
          onClose={() => setShowQChanger(false)}
          data={data}
          onSetBatchSize={onSetBatchSize}
          maxQuestions={maxQuestions}
          origLength={origLength}
          difficulty={difficulty}
          onSetDifficulty={onSetDifficulty}
          localDiff={localDiff}
          onSetLocalDiff={setLocalDiff}
          localBatchSize={localBatchSize}
          onSetLocalBatchSize={setLocalBatchSize}
          useSame={useSame}
          onSetUseSame={setUseSame}
          isChecked={isChecked}
          onSetIsChecked={setIsChecked}
          onQuizStart={onQuizStart}
          onRestart={onRestart}
          firstTry={firstTry}
        />
      ) : (
        <Fragment>
          {' '}
          {firstTry ? (
            <div className='qSelector'>
              <Typography variant='h4' style={{ marginBottom: 36 }}>
                Fortsätt!
              </Typography>
              {difficulty !== 3 ? (
                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='contained'
                  color='primary'
                  onClick={() => advance()}
                >
                  Till
                  {difficulty === 1 && (
                    <span className='diffSpan'>Rutinerad</span>
                  )}
                  {difficulty === 2 && <span className='diffSpan'>Proffs</span>}
                  <span className='subtle'>({origLength})</span>
                </Button>
              ) : (
                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='contained'
                  color='primary'
                  onClick={() => setShowQChanger(true)}
                >
                  <span className='diffSpan'>Nya frågor</span>
                </Button>
              )}

              {difficulty !== 3 ? (
                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='outlined'
                  color='primary'
                  onClick={() => setShowQChanger(true)}
                >
                  Ändra frågor
                </Button>
              ) : (
                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='outlined'
                  color='primary'
                  onClick={onRestart}
                >
                  <span className='diffSpan'>Repetera</span>
                  <span className='subtle'>({origLength})</span>
                </Button>
              )}
            </div>
          ) : (
            <ThemeProvider theme={secondaryTheme}>
              <div className='qSelector passed'>
                <Typography variant='h4' style={{ marginBottom: 36 }}>
                  Fortsätt!
                </Typography>

                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='contained'
                  color='primary'
                  onClick={onRestart}
                >
                  <span className='diffSpan'>Repetera</span>
                  <span className='subtle'>({origLength})</span>
                </Button>
                <Button
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 6,
                    marginTop: 6,
                    width: 200,
                  }}
                  variant='outlined'
                  color='primary'
                  onClick={() => setShowQChanger(true)}
                >
                  Ändra frågor
                </Button>
              </div>
            </ThemeProvider>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default QSelector;
