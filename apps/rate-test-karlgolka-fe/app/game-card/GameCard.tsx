import React from 'react'
import { Card, useFlipCardMutation } from '@rate-test-karlgolka/react-data-access'
import styles from './GameCard.module.scss'

/* eslint-disable-next-line */
export interface CardProps {
  card: Card
  gameId: string
}

interface SpriteMap {
  [key: string]: number[]
}

// ##################################################################################
// # CARD
// ##################################################################################
export function GameCard({ card, gameId }: CardProps) {
  const [, flipCard] = useFlipCardMutation()
  const getBackgroundPosition = () => {
    const [x, y] = cardSpriteMap[card.name]
    return `-${x}px -${y}px`
  }
  const handleClick = async (e) => {
    await flipCard({ gameId, cardId: card.id, isTurned: !card.isTurned })
  }

  const faceUp = <div className={`${styles.cardGuts} ${styles.cardGutsCommon}`}
    style={{
      backgroundPosition: getBackgroundPosition()
    }}>
  </div>

  const faceDown = <div className={`${styles.placeholder} ${styles.cardGutsCommon}`}>
    <span role='img' aria-label='emoji'>👆</span>
  </div>

  return (
    <div className={styles.card} onClick={handleClick}>
      {card.isTurned ? faceUp : faceDown}
    </div>
  )
}

export default GameCard

// aka `a, 2, 3, 4, 5, 6, 7, 8, 9, 10, j, q, k` *  `spade, diamonds, hearts, clubs`
const cardSpriteMap: SpriteMap = {
  // SPADE
  "spade-a": [0, 0],
  "spade-2": [62, 0],
  "spade-3": [123, 0],
  "spade-4": [185, 0],
  "spade-5": [246, 0],
  "spade-6": [308, 0],
  "spade-7": [369, 0],
  "spade-8": [431, 0],
  "spade-9": [492, 0],
  "spade-10": [554, 0],
  "spade-j": [615, 0],
  "spade-q": [677, 0],
  "spade-k": [738, 0],
  // CLUB
  "club-a": [0, 81],
  "club-2": [62, 81],
  "club-3": [123, 81],
  "club-4": [185, 81],
  "club-5": [246, 81],
  "club-6": [308, 81],
  "club-7": [369, 81],
  "club-8": [431, 81],
  "club-9": [492, 81],
  "club-10": [554, 81],
  "club-j": [615, 81],
  "club-q": [677, 81],
  "club-k": [738, 81],
  // DIAMOND
  "diamond-a": [0, 162],
  "diamond-2": [62, 162],
  "diamond-3": [123, 162],
  "diamond-4": [185, 162],
  "diamond-5": [246, 162],
  "diamond-6": [308, 162],
  "diamond-7": [369, 162],
  "diamond-8": [431, 162],
  "diamond-9": [492, 162],
  "diamond-10": [554, 162],
  "diamond-j": [615, 162],
  "diamond-q": [677, 162],
  "diamond-k": [738, 162],
  // HEART
  "heart-a": [0, 243],
  "heart-2": [62, 243],
  "heart-3": [123, 243],
  "heart-4": [185, 243],
  "heart-5": [246, 243],
  "heart-6": [308, 243],
  "heart-7": [369, 243],
  "heart-8": [431, 243],
  "heart-9": [492, 243],
  "heart-10": [554, 243],
  "heart-j": [615, 243],
  "heart-q": [677, 243],
  "heart-k": [738, 243],
}
