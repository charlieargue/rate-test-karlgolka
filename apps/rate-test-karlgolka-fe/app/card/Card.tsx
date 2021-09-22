import React from 'react';

import styles from './Card.module.scss';

/* eslint-disable-next-line */
export interface CardProps { }

interface SpriteMap {
  [key: string]: number[][]
}

// aka `a, 2, 3, 4, 5, 6, 7, 8, 9, 10, j, q, k` *  `spade, diamonds, hearts, clubs`
const cardSpriteMap: SpriteMap = {
  "spade-a": [[0, 0], [100, 150]],
  // "hearts-7": [[0, 0], [100, 150]],
}
// VIP: cards that match must be replaced by a placeholder image, but keep their spots "intact!" 
// ... otherwise not a very good memory game!

export function Card(props: CardProps) {
  return (
    <div className={styles.card} style={{

    }}>
      <div className={styles.cardGuts}>
      </div>
    </div>
  );
}

export default Card;
