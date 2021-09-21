import { useRouter } from 'next/router';
import React from 'react';
import Button from '../button/Button';
import styles from './NewGameButton.module.scss';

/* eslint-disable-next-line */
export interface NewGameButtonProps { }

export function NewGameButton(props: NewGameButtonProps) {
  const router = useRouter()

  const handleClick = (e) => {
    router.push('?game=abcd');
  }
  return (
    <Button onClick={handleClick}>New Game</Button>
  );
}

export default NewGameButton;
