import React, { Fragment, useState } from 'react';

import '../../App.css';
import '../../Components.css';

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
      <div className='content-card'>
        <i className='fas fa-times closeBtn' onClick={onClose}></i>
        <div className='content-card-content'>
          <h5 className='header italic'>Antal frågor: {origLength}</h5>
          <div className='lengthSelection input-range-smaller'>
            <p className='lengthSelection-label'>0</p>
            <input
              type='range'
              defaultValue={defaultValue}
              min={1}
              max={maxQuestions - 1}
              step={1}
              onChange={changeHandler}
            />
            <p className='lengthSelection-label'>{maxQuestions - 1}</p>
          </div>

          <ul className='unordered-list'>
            {data.map((item, index) => (
              <li key={index} className='listItem'>
                <span>{item.question}</span>
                <span>{item.answer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Preview;
