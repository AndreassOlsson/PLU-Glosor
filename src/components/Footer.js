import React from 'react';

function Footer({ onReset }) {
  return (
    <div className='footer'>
      <i
        className='fas fa-home interactive discrete'
        onClick={() => onReset()}
      ></i>
    </div>
  );
}

export default Footer;
