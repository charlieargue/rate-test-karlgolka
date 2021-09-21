import React from 'react';

import styles from './Card.module.scss';

/* eslint-disable-next-line */
export interface CardProps {}

export function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <h1>Welcome to Card!</h1>
      <p>one</p>
      <p>one</p>
      <p>one</p>
      <p>one</p>
    </div>
  );
}

export default Card;
