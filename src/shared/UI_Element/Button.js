import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || 'button'}>
      {props.children}
    </button>
  );
};
export default Button;
