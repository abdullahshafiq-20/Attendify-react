import React from 'react';
import './style.module.css';

const Legend = ({ text }) => {
  return (
    <div className="legend-container">
      <div className="legend-divider"></div>
      <span className="legend-text">{text}</span>
      <div className="legend-divider"></div>
    </div>
  );
};

export default Legend;