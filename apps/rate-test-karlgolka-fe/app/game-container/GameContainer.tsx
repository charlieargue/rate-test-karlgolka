import { useRouter } from 'next/router';
import React from 'react';
import Card from '../card/Card';
import Loading from '../loading/loading';
import Logo from '../logo/Logo';
import NewGameButton from '../new-game-button/NewGameButton';
import styles from './GameContainer.module.scss';

/* eslint-disable-next-line */
export interface GameContainerProps { }

const initialState = {
  id: "123-245asdfasdf-234234lkj-666",
  cards: []
}

export function GameContainer(props: GameContainerProps) {
  const router = useRouter()
  const [game, setGame] = React.useState(initialState)

  console.log(router.query.game);

  let content
  if (router.query.game) {
    content = (
      <div className={styles.game}>
        {new Array(24).fill({}).map((a, idx) => (
          <Card key={idx} />
        ))}
      </div>
    )
  } else {
    content = <Loading />
  }
  // return <></> // idle -> make a new game!

  return (<>
    <header>
      <Logo />
      <NewGameButton setGame={setGame} />
    </header>
    <main>
      {content}
    </main>
  </>)
}

export default GameContainer;
