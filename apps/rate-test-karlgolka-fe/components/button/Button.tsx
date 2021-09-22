import React from 'react';

import styles from './Button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  children?: string | React.ReactChildren
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any // all other props
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button type="button" className={styles.button} {...props}>{children}</button>
  );
}

export default Button;
