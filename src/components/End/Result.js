import React, { Fragment } from 'react';

import '../../App.css';

const Result = ({ onClose, firstTry, data, origData, wrongAnswers }) => {
  const getCustomArray = () => {
    let arr = [...origData];

    for (let i = 0; i < data.length; i++) {
      if (arr.includes(data[i])) {
        arr.splice(arr.indexOf(data[i]), 1);
      }
    }
    return arr;
  };

  return (
    <div className='content-card'>
      <i className='fas fa-times closeBtn' onClick={onClose}></i>
      <div className='content-card-content'>
        <h5 className='header-xl'>Resultat</h5>
        <ul className='unordered-list'>
          {firstTry ? (
            <Fragment>
              {' '}
              {data.map((item, index) => (
                <li key={index} className='listItem'>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'highlight primary'
                        : 'highlight danger'
                    }
                  >
                    {wrongAnswers[index] === 0 ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                    {item.question}
                  </span>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'highlight primary'
                        : 'highlight danger'
                    }
                  >
                    {item.answer}
                  </span>
                </li>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {data.map((item, index) => (
                <li key={index} className='listItem'>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'highlight primary'
                        : 'highlight danger'
                    }
                  >
                    {wrongAnswers[index] === 0 ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                    {item.question}
                  </span>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'highlight primary'
                        : 'highlight danger'
                    }
                  >
                    {item.answer}
                  </span>
                </li>
              ))}
              {getCustomArray().map((item, index) => (
                <li key={index} className='listItem'>
                  <span className='highlight primary'>
                    <i className='fas fa-check'></i>
                    {item.question}
                  </span>
                  <span className='highlight primary'>{item.answer}</span>
                </li>
              ))}
            </Fragment>
          )}
        </ul>
      </div>
    </div>

    /*
      <div className='listCard'>
        <div className='fas-container'>
          <i id='closeButton' className='fas fa-times' onClick={onClose}></i>
        </div>

        <ul className='previewList'>
          <li className='previewItem previewHeader'>
            <span>Fråga:</span>
            <span>Rätt svar:</span>
          </li>

          {firstTry ? (
            <Fragment>
              {' '}
              {data.map((item, index) => (
                <li key={index} className='previewItem'>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'previewQ highlight'
                        : 'previewQ highlight-danger'
                    }
                  >
                    {wrongAnswers[index] === 0 ? (
                      <i className='fas fa-check' id='check'></i>
                    ) : (
                      <i className='fas fa-times' id='cross'></i>
                    )}
                    {item.question}
                  </span>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'previewA highlight'
                        : 'previewA highlight-danger'
                    }
                  >
                    {item.answer}
                  </span>
                </li>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {' '}
              {data.map((item, index) => (
                <li key={index} className='previewItem'>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'previewQ highlight'
                        : 'previewQ highlight-danger'
                    }
                  >
                    {wrongAnswers[index] === 0 ? (
                      <i className='fas fa-check' id='check'></i>
                    ) : (
                      <i className='fas fa-times' id='cross'></i>
                    )}
                    {item.question}
                  </span>
                  <span
                    className={
                      wrongAnswers[index] === 0
                        ? 'previewA highlight'
                        : 'previewA highlight-danger'
                    }
                  >
                    {item.answer}
                  </span>
                </li>
              ))}
              {getCustomArray().map((item, index) => (
                <li key={index} className='previewItem'>
                  <span className='previewQ highlight'>
                    <i className='fas fa-check' id='check'></i>
                    {item.question}
                  </span>
                  <span className='previewA highlight'>{item.answer}</span>
                </li>
              ))}
            </Fragment>
          )}
        </ul>
      </div>
*/
  );
};

export default Result;
