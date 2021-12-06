import React, { Fragment, useState } from 'react';

import Typography from '@mui/material/Typography';

import '../../App.css';
import './Start.css';

const Preview = ({
  onClose,
  data,
  onSetBatchSize,
  maxQuestions,
  origLength,
}) => {
  const [defaultValue, setDefaultValue] = useState(origLength);
  const changeHandler = (e) => {
    onSetBatchSize(e.target.valueAsNumber);
    setDefaultValue(e.target.valueAsNumber);
  };

  return (
    <Fragment>
      <div className='listCard'>
        <div className='fas-container'>
          <i id='closeButton' className='fas fa-times' onClick={onClose}></i>
        </div>
        <Typography variant='h6' style={{ marginTop: 24 }}>
          Antal frågor:<span className='subtle'>({origLength})</span>
        </Typography>
        <div className='flexColumn adpt'>
          <p className='greyText'>0</p>
          <input
            type='range'
            defaultValue={defaultValue}
            min={1}
            max={maxQuestions - 1}
            step={1}
            onChange={changeHandler}
          />
          <p className='greyText'>{maxQuestions - 1}</p>
        </div>

        <ul className='previewList'>
          {data.map((item, index) => (
            <li key={index} className='previewItem'>
              <span className='previewQ'>{item.question}</span>
              <span className='previewA'>{item.answer}</span>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Preview;
