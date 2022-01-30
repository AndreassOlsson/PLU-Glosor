import React, { useState, useEffect } from 'react';

import '../../App.css';
import '../../Components.css';

function QuestionChanger({
  origLength,
  maxQuestions,
  onSetViewQuestionChanger,
  onSetDifficulty,
  onSetBatchSize,
  onQuizStart,
  onRestart,
  onSetBg,
}) {
  const [triggerCustomStart, setTriggerCustomStart] = useState(false);
  useEffect(() => {
    if (triggerCustomStart) {
      onSetBg('bg1');
      onQuizStart();
    }
  }, [triggerCustomStart, onQuizStart, onSetBg]);
  const [localDiff, setLocalDiff] = useState(1);
  const [localBatchSize, setLocalBatchSize] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [useSame, setUseSame] = useState(false);

  const lengthHandler = (e) => {
    setUseSame(false);
    setIsChecked(false);
    setLocalBatchSize(e.target.valueAsNumber);
  };
  const diffHandler = (e) => {
    setLocalDiff(e.target.valueAsNumber);
  };
  const handleUseSame = (e) => {
    if (e.target.checked) {
      setUseSame(true);
      setIsChecked(true);
      setLocalBatchSize(origLength);
    } else {
      setUseSame(false);
      setIsChecked(false);
    }
  };
  const handleClick = () => {
    if (useSame) {
      setUseSame(false);
      setIsChecked(false);
    } else {
      setUseSame(true);
      setIsChecked(true);
      setLocalBatchSize(origLength);
    }
  };
  const customStart = () => {
    if (useSame) {
      onSetDifficulty(localDiff);
      onSetBatchSize(localBatchSize);
      onSetBg('bg1');
      onRestart();
    } else {
      onSetDifficulty(localDiff);
      onSetBatchSize(localBatchSize);
      setTriggerCustomStart(true);
    }
  };

  return (
    <div className='content-card'>
      <i
        className='fas fa-times closeBtn'
        onClick={() => onSetViewQuestionChanger(false)}
      ></i>
      <div className='content-card-content'>
        <h3 className='header-xl'>Välj frågor</h3>
        <div>
          <h5 className='header italic'>Svårhetsgrad</h5>
          <div className='diffSelection input-range-smaller'>
            <input
              type='range'
              value={localDiff}
              min={1}
              max={3}
              step={1}
              onChange={diffHandler}
            />
            <div className='diffSelection-labels'>
              <p
                className={
                  localDiff === 1
                    ? 'highlight primary-darker interactive adjustLeftLabel'
                    : 'discrete interactive adjustLeftLabel'
                }
                onClick={() => setLocalDiff(1)}
              >
                Nybörjare
              </p>
              <p
                className={
                  localDiff === 2
                    ? 'highlight primary-darker interactive'
                    : 'discrete interactive'
                }
                onClick={() => setLocalDiff(2)}
              >
                JIHAD
              </p>
              <p
                className={
                  localDiff === 3
                    ? 'highlight primary-darker interactive adjustRightLabel'
                    : 'discrete interactive adjustRightLabel'
                }
                onClick={() => setLocalDiff(3)}
              >
                BANGBANG
              </p>
            </div>
          </div>
        </div>
        <div>
          <h5 className='header italic'>Antal frågor: {localBatchSize}</h5>

          <div
            className={
              useSame
                ? 'lengthSelection useSame input-range-smaller'
                : 'lengthSelection input-range-smaller'
            }
          >
            <p className='lengthSelection-label'>0</p>
            <input
              type='range'
              value={localBatchSize}
              min={1}
              max={maxQuestions - 1}
              step={1}
              onChange={lengthHandler}
            />
            <p className='lengthSelection-label'>{maxQuestions - 1}</p>
          </div>
          <div>
            <label
              className={
                useSame
                  ? 'lengthSelection-label interactive'
                  : 'lengthSelection-label interactive useSame'
              }
              htmlFor='sameQ'
              onClick={() => handleClick()}
            >
              Använda samma frågor
            </label>
            <input
              className='interactive'
              type='checkbox'
              name='sameQ'
              checked={isChecked}
              onChange={(e) => handleUseSame(e)}
            />
          </div>
        </div>
        <button className='btn-contained' onClick={() => customStart()}>
          Starta Quiz
        </button>
      </div>
    </div>
  );
}

export default QuestionChanger;
