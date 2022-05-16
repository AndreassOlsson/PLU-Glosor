import React from 'react';

const Textbox = ({ header, text, img }) => {
  return (
    <div className='textbox'>
      {header && <div className='header'>{header}</div>}
      {text && <p>{text}</p>}
      {img && <div className='landing-image'></div>}
    </div>
  );
};

export default Textbox;
