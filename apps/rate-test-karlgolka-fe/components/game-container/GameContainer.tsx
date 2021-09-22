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
  console.log("🚀 ~ isComparing", isComparing)
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
    setIsComparing(true)
    const turnedCards = data.game.cards.filter((card) => card.isTurned === true)
    // check if have match, and act accordingly
    if (haveMatch()) {
      // A) got a match, make them both isMatch=true + isTurned=false and thereby hide from board
      await Promise
        .all([
          flipCard({ gameId: data.game.id, cardId: turnedCards[0].id, isTurned: false, isMatched: true }),
          flipCard({ gameId: data.game.id, cardId: turnedCards[1].id, isTurned: false, isMatched: true })
        ])
      setIsComparing(false)
    } else {
      // B) no match, so isTurned should be false for both (fire two flips!)
      await Promise
        .all([
          flipCard({ gameId: data.game.id, cardId: turnedCards[0].id, isTurned: false, isMatched: false }),
          flipCard({ gameId: data.game.id, cardId: turnedCards[1].id, isTurned: false, isMatched: false })
        ])
      setIsComparing(false)
    }
  }, [data, flipCard, haveMatch])

  // -------------------
  React.useEffect(() => {
    if (havePairTurned()) {
      compareResultsAsync()
    }
  }, [compareResultsAsync, havePairTurned])

  // ------------------- JUST IN CASE: hard-to-repro bug cleaner
  React.useEffect(() => {
    // TODO: hacky, but just seeing if this fixes the hard-to-reproduce issue...
    // NOTE: this happens when you click really fast and play as quick as you can (on my touch screen, for eg.)
    // NOTE: so every time data changes, we'll shore up any dirty data, sigh
    // find any straggler cards (no matching pairs on game board)
    if (!isComparing) {
      const stragglers = []
      data?.game?.cards?.forEach((card) => {
        if (!data.game.cards.find((c) => c.id !== card.id && c.name === card.name)) {
          console.log('🧹 SWEEPING UP any dirty data...', card)
          stragglers.push(card)
        }
      })
      console.log("🚀 ~ stragglers", stragglers)
      // and remove them! NOTE: this would only happen when a card is flipped up
      // what does that mean? you mean FLIP THEM again, right?
      for (const straggler of stragglers) {
        flipCard({ gameId: data.game.id, cardId: straggler.id, isTurned: false, isMatched: true })
      }
    }
  }, [data, flipCard, isComparing])

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
