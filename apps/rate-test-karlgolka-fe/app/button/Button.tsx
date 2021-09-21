import React from 'react';

import styles from './Button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps { }

export function Button(props: ButtonProps) {
  return (
    <button type="button" className={styles.button}>New Game</button>
  );
}

export default Button;
