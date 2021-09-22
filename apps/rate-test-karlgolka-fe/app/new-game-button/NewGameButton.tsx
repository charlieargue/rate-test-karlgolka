import { useRouter } from 'next/router'
import React from 'react'
import Button from '../button/Button'
import styles from './NewGameButton.module.scss'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

/* eslint-disable-next-line */
export interface NewGameButtonProps {
  setGame: React.Dispatch<React.SetStateAction<{
    id: string
    cards: unknown[]
  }>>
}

export function NewGameButton({ setGame }: NewGameButtonProps) {
  const router = useRouter()
  const newGame = () => {
    router.push('?game=abcd')
  }

  const handleClick = (e) => {
    if (router.query.game) {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure? You will lose your current game...',
        buttons: [
          {
            label: 'Yes',
            onClick: newGame
          },
          {
            label: 'No',
            onClick: null
          }
        ]
      })
    } else {
      newGame()
    }

  }
  return (
    <Button onClick={handleClick}>New Game</Button>
  )
}

export default NewGameButton
