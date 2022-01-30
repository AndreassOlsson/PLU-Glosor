import React from 'react';

import '../App.css';
import '../Components.css';

function Footer({ onReset }) {
  return (
    <i
      className='fas fa-home interactive discrete'
      onClick={() => onReset()}
    ></i>
  );
}

export default Footer;
