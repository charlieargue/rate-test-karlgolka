import { useRouter } from 'next/router'
import React from 'react'
import Button from '../button/Button'
import styles from './NewGameButton.module.scss'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { useNewGameMutation } from '@rate-test-karlgolka/react-data-access'

/* eslint-disable-next-line */
export interface NewGameButtonProps { }

// TODO: how to keep from firing twice (upon new game click) without too much complication???

// ##################################################################################
// # New Game BUTTON
// ##################################################################################
export function NewGameButton(props: NewGameButtonProps) {
  const [, newGame] = useNewGameMutation()
  const router = useRouter()

  // -------------------
  const newGameHandler = async () => {
    const { error, data } = await newGame()
    if (!error && data?.newGame?.id) {
      router.push(`?game=${data?.newGame?.id}`)
    } else if (error) {
      console.log(error)
      // TODO: toast "an error has occurred" + sanitized details
    }
  }

  // -------------------
  const handleClick = (e) => {
    if (router.query.game) {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure? You will lose your current game...',
        buttons: [
          {
            label: 'Yes',
            onClick: newGameHandler
          },
          {
            label: 'No',
            onClick: null
          }
        ]
      })
    } else {
      newGameHandler()
    }

  }
  return (
    <Button onClick={handleClick}>New Game</Button>
  )
}

export default NewGameButton
