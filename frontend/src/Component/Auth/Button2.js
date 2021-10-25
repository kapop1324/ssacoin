import React from 'react';
import './scss/Button.scss';

const Button2 = ({ name, fuc }) => {
  const HandlerClick = () => {
    fuc();
  };

  return (
    <button className="button2" type="button" onClick={() => HandlerClick()}>
      {name}
    </button>
  );
};

export default Button2;
