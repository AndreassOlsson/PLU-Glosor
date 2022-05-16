import React from 'react';

import '../../App.css';
import '../../Components.css';

function Footer({ onReset, bg }) {
  const handleClassName = () => {
    if (bg === 'bg3') {
      return 'danger-dark';
    } else if (bg === 'bg2') {
      return 'warning-dark';
    } else {
      return 'primary-dark';
    }
  };

  return (
    <i
      className={'footer fas fa-home interactive ' + handleClassName()}
      onClick={() => onReset()}
    ></i>
  );
}

export default Footer;
