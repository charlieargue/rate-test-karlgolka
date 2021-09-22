import { useRouter } from 'next/router';
import React from 'react';
import Card from '../card/Card';
import Loading from '../loading/loading';
import Logo from '../logo/Logo';
import NewGameButton from '../new-game-button/NewGameButton';
import styles from './GameContainer.module.scss';
import { Game } from '@rate-test-karlgolka/react-data-access'

/* eslint-disable-next-line */
export interface GameContainerProps { }

export function GameContainer(props: GameContainerProps) {
  const router = useRouter()
  const [game, setGame] = React.useState<Game | null>(null)

  console.log(router.query.game);

  // TODO: clean-up and Kent Dobbs all this
  let content
  if (router.query.game && game?.id) {
    content = (
      <div className={styles.game}>
        {game.cards.length && game.cards.map((a, idx) => (
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
