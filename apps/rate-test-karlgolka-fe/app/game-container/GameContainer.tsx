import { useGetGameQuery } from '@rate-test-karlgolka/react-data-access'
import { useRouter } from 'next/router'
import React from 'react'
import GameCard from '../game-card/GameCard'
import Loading from '../loading/loading'
import Logo from '../logo/Logo'
import NewGameButton from '../new-game-button/NewGameButton'
import styles from './GameContainer.module.scss'

/* eslint-disable-next-line */
export interface GameContainerProps { }

// ##################################################################################
// # GAME CONTAINER
// ##################################################################################
export function GameContainer(props: GameContainerProps) {
  const router = useRouter()
  const [{ data, fetching }] = useGetGameQuery({
    variables: {
      id: router.query.game as string
    },
    pause: !router.query.game
  })

  console.log(router.query.game)

  // TODO: clean-up and Kent Dobbs-ify all this
  let content
  if (router.query.game && !fetching && data?.game) {
    content = (
      <div className={styles.game}>
        {data.game.cards.length && data.game.cards.map((card, idx) => (
          <GameCard key={idx} card={card} />
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
      <NewGameButton />
    </header>
    <main>
      {content}
    </main>
  </>)
}

export default GameContainer
