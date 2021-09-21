import React from 'react';

import styles from './Card.module.scss';

/* eslint-disable-next-line */
export interface CardProps {}

// aka `a, 2, 3, 4, 5, 6, 7, 8, 9, 10, j, q, k` *  `spade, diamonds, hearts, clubs`
// VIP: cards that match must be replaced by a placeholder image, but keep their spots "intact!" 
// ... otherwise not a very good memory game!

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
