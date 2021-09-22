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
  const [isThinking, setIsThinking] = React.useState(false) // so can't flip other cards while comparing a flipped pair for a match
  const router = useRouter()
  const [{ data, fetching }] = useGetGameQuery({
    variables: {
      id: router.query.game as string
    },
    pause: !router.query.game
  })
  const havePairTurned = (): boolean => {
    return data.game.cards.filter((card) => card.isTurned === true).length === 2
  }
  const haveMatch = (): boolean => {
    // just checks first two items returned in this array, FYI
    const turnedCards = data.game.cards.filter((card) => card.isTurned === true)
    if (turnedCards.length >= 2) {
      return turnedCards[0] === turnedCards[1]
    }
    return false
  }
  const findOtherFlippedCardId = (excludeId): string => {
    return data.game.cards.find((card) => card.isTurned === true && card.id !== excludeId).id
  }

  // TODO: clean-up and Kent Dobbs-ify all this
  let content
  if (router.query.game && !fetching && data?.game) {
    content = (
      <div className={styles.game}>
        {data.game.cards.length && data.game.cards.map((card, idx) => (
          <GameCard
            key={idx}
            card={card}
            gameId={data.game.id}
            isThinking={isThinking}
            setIsThinking={setIsThinking}
            havePairTurned={havePairTurned}
            haveMatch={haveMatch} 
            findOtherFlippedCardId={findOtherFlippedCardId}/>
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
