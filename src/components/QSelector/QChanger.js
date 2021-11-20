import React, { useState, useEffect, Fragment } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import secondaryTheme from '../../secondaryTheme';
import { ThemeProvider } from '@mui/material/styles';

import '../../App.css';
import './QSelector.css';

const QChanger = ({
  data,
  onSetBatchSize,
  maxQuestions,
  origLength,
  difficulty,
  onClose,
  onSetDifficulty,
  localDiff,
  onSetLocalDiff,
  localBatchSize,
  onSetLocalBatchSize,
  useSame,
  onSetUseSame,
  isChecked,
  onSetIsChecked,
  onQuizStart,
  onRestart,
  firstTry,
}) => {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      onQuizStart();
    }
  }, [trigger, onQuizStart]);

  const handleUseSame = (e) => {
    if (e.target.checked) {
      onSetUseSame(true);
      onSetIsChecked(true);
      onSetLocalBatchSize(origLength);
      onSetBatchSize(origLength);
    } else {
      onSetUseSame(false);
      onSetIsChecked(false);
    }
  };

  const changeLength = (e) => {
    onSetUseSame(false);
    onSetIsChecked(false);
    onSetLocalBatchSize(e.target.valueAsNumber);
  };

  const changeDiff = (e) => {
    onSetLocalDiff(e.target.valueAsNumber);
  };

  const customStart = () => {
    if (useSame) {
      onSetDifficulty(localDiff);
      onRestart();
    } else {
      setTrigger(true);
      onSetDifficulty(localDiff);
      onSetBatchSize(localBatchSize);
    }
  };

  return (
    <Fragment>
      {firstTry ? (
        <div className='qSelector'>
          <div className='fas-container'>
            <i id='QClose' className='fas fa-times' onClick={onClose}></i>
          </div>
          <Typography variant='h6' style={{ marginTop: 6 }}>
            Antal frågor:<span className='subtle'>({localBatchSize})</span>
          </Typography>
          <div className={useSame ? 'flexColumn useSame' : 'flexColumn'}>
            <p className='greyText'>0</p>
            <input
              type='range'
              value={localBatchSize}
              min={1}
              max={maxQuestions}
              step={1}
              onChange={changeLength}
            />
            <p className='greyText'>{maxQuestions}</p>
          </div>
          <div className='difficulty' id='difficulty'>
            <input
              type='range'
              defaultValue={localDiff}
              min={1}
              max={3}
              step={1}
              onChange={changeDiff}
            />
            <ul className='labels'>
              <li
                className={localDiff === 1 ? 'selectedDiff' : 'nonSelectedDiff'}
              >
                Nybörjare
              </li>
              <li
                className={localDiff === 2 ? 'selectedDiff' : 'nonSelectedDiff'}
              >
                Rutinerad
              </li>
              <li
                className={localDiff === 3 ? 'selectedDiff' : 'nonSelectedDiff'}
              >
                Proffs
              </li>
            </ul>
          </div>
          <div>
            <label htmlFor='sameQ'>Fortsätt använda samma frågor</label>
            <input
              type='checkbox'
              id='sameQ'
              name='sameQ'
              checked={isChecked}
              onChange={(e) => handleUseSame(e)}
            />
          </div>
          <Button
            style={{ marginTop: 48, marginBottom: 12 }}
            variant='contained'
            color='primary'
            onClick={() => customStart()}
          >
            <span className='diffSpan'>Starta quiz</span>
            <span className='subtle'>({origLength})</span>
          </Button>
        </div>
      ) : (
        <ThemeProvider theme={secondaryTheme}>
          <div className='qSelector passed'>
            <div className='fas-container'>
              <i id='QClose' className='fas fa-times' onClick={onClose}></i>
            </div>
            <Typography variant='h6' style={{ marginTop: 6 }}>
              Antal frågor:<span className='subtle'>({localBatchSize})</span>
            </Typography>
            <div className={useSame ? 'flexColumn useSame' : 'flexColumn'}>
              <p className='greyText'>0</p>
              <input
                type='range'
                id='passedRange'
                value={localBatchSize}
                min={1}
                max={maxQuestions}
                step={1}
                onChange={changeLength}
              />
              <p className='greyText'>{maxQuestions}</p>
            </div>
            <div className='difficulty' id='difficulty'>
              <input
                type='range'
                id='passedRange'
                defaultValue={localDiff}
                min={1}
                max={3}
                step={1}
                onChange={changeDiff}
              />
              <ul className='labels'>
                <li
                  className={
                    localDiff === 1 ? 'selectedDiff' : 'nonSelectedDiff'
                  }
                >
                  Nybörjare
                </li>
                <li
                  className={
                    localDiff === 2 ? 'selectedDiff' : 'nonSelectedDiff'
                  }
                >
                  Rutinerad
                </li>
                <li
                  className={localDiff > 2 ? 'selectedDiff' : 'nonSelectedDiff'}
                >
                  Proffs
                </li>
              </ul>
            </div>
            <div>
              <label htmlFor='sameQ'>Fortsätt använda samma frågor</label>
              <input
                type='checkbox'
                id='sameQ'
                name='sameQ'
                checked={isChecked}
                onChange={(e) => handleUseSame(e)}
              />
            </div>
            <Button
              style={{ marginTop: 48, marginBottom: 12 }}
              variant='contained'
              color='primary'
              onClick={() => customStart()}
            >
              <span className='diffSpan'>Starta quiz</span>
              <span className='subtle'>({origLength})</span>
            </Button>
          </div>
        </ThemeProvider>
      )}
    </Fragment>
  );
};

export default QChanger;
