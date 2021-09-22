import { useGetGameQuery, useFlipCardMutation } from '@rate-test-karlgolka/react-data-access'
import { useRouter } from 'next/router'
import React from 'react'
import GameCard from '../game-card/GameCard'
import Loading from '../loading/loading'
import Logo from '../logo/Logo'
import NewGameButton from '../new-game-button/NewGameButton'
import styles from './GameContainer.module.scss'
import Confetti from 'react-confetti'
import { useWindowSize } from '../../hooks/useWindowSize'

/* eslint-disable-next-line */
export interface GameContainerProps { }

// ##################################################################################
// # GAME CONTAINER
// ##################################################################################
export function GameContainer(props: GameContainerProps) {
  const [isComparing, setIsComparing] = React.useState(false)
  const size = useWindowSize()
  const [, flipCard] = useFlipCardMutation()
  const router = useRouter()
  const [{ data, fetching }] = useGetGameQuery({
    variables: {
      id: router.query.game as string
    },
    pause: !router.query.game
  })
  const haveWin = React.useCallback((): boolean => {
    if (data) {
      return data.game.cards.filter((card) => card.isMatched === false).length === 0
    }
  }, [data])
  const havePairTurned = React.useCallback((): boolean => {
    if (data) {
      return data.game.cards.filter((card) => card.isTurned === true).length === 2
    }
  }, [data])

  const haveMatch = React.useCallback((): boolean => {
    // just checks first two items returned in this array, FYI
    const turnedCards = data.game.cards.filter((card) => card.isTurned === true)
    if (turnedCards.length >= 2) {
      return turnedCards[0].name === turnedCards[1].name
    }
    return false
  }, [data])
  const findOtherFlippedCardId = (excludeId): string => {
    return data.game.cards.find((card) => card.isTurned === true && card.id !== excludeId).id
  }

  // -------------------
  const compareResultsAsync = React.useCallback(async () => {
    const turnedCards = data.game.cards.filter((card) => card.isTurned === true)
    if (turnedCards.length === 2) {
      // check if have match, and act accordingly
      if (haveMatch()) {
        // A) got a match, make them both isMatch=true + isTurned=false and thereby hide from board
        await (Promise.all([
          flipCard({ gameId: data.game.id, cardId: turnedCards[0].id, isTurned: false, isMatched: true }),
          flipCard({ gameId: data.game.id, cardId: turnedCards[1].id, isTurned: false, isMatched: true })
        ]))
      } else {
        // B) no match, so isTurned should be false for both (fire two flips!)
        await (Promise.all([
          flipCard({ gameId: data.game.id, cardId: turnedCards[0].id, isTurned: false, isMatched: false }),
          flipCard({ gameId: data.game.id, cardId: turnedCards[1].id, isTurned: false, isMatched: false })
        ]))
      }
    }
  }, [data, flipCard, haveMatch])

  // -------------------
  React.useEffect(() => {
    setIsComparing(true)
    if (havePairTurned()) {
      compareResultsAsync()
    }
    setIsComparing(false)
  }, [compareResultsAsync, havePairTurned])


  let content
  if (haveWin()) {
    content = <Confetti
      width={size.width}
      height={size.height}
    />
  } else if (router.query.game && !fetching && data?.game) {
    content = (
      <div className={styles.game}>
        {data.game.cards.length && data.game.cards.map((card, idx) => (
          <GameCard
            key={idx}
            card={card}
            gameId={data.game.id}
            havePairTurned={havePairTurned}
            isComparing={isComparing} />
        ))}
      </div>
    )
  } else if (fetching) {
    content = <Loading />
  } else {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    content = <></> // idle -> make a new game!
  }

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
