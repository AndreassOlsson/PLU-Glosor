import React from 'react';

import '../App.css';
import '../Components.css';

function Footer({ onReset, bg }) {
  const handleClassName = () => {
    if (bg === 'bg3') {
      return 'fas fa-home interactive danger-dark';
    } else if (bg === 'bg2') {
      return 'fas fa-home interactive warning-dark';
    } else {
      return 'fas fa-home interactive primary-dark';
    }
  };

  return <i className={handleClassName()} onClick={() => onReset()}></i>;
}

export default Footer;
