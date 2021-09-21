import React from 'react';
import Button from '../button/Button';

import styles from './NewGameButton.module.scss';

/* eslint-disable-next-line */
export interface NewGameButtonProps { }

export function NewGameButton(props: NewGameButtonProps) {
  return (
    <Button>New Game</Button>
  );
}

export default NewGameButton;
