import React from 'react';
import './LoadingBar.css'; // Import your CSS file for styling

const LoadingBar = ({ isLoading }) => {
  return isLoading ? <div className="loading-bar"></div> : null;
};

export default LoadingBar;
