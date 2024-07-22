import React from 'react';
import './loader.css';
const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
