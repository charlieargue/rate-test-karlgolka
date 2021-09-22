import React from 'react';
import Card from '../card/Card';
import { useRouter } from 'next/router'
import styles from './GameContainer.module.scss';
import Loading from '../loading/loading';

/* eslint-disable-next-line */
export interface GameContainerProps { }

export function GameContainer(props: GameContainerProps) {

  // just testing
  const router = useRouter()
  console.log(router.query.game);

  if (router.query.game) {
    return (
      <div className={styles.game}>
        {new Array(24).fill({}).map((a, idx) => (
          <Card key={idx} />
        ))}
      </div>
    )
  } 
  return <Loading />
  // return idle -> make a new game!
}

export default GameContainer;
