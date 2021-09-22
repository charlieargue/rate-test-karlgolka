/* eslint-disable jsx-a11y/accessible-emoji */
import NextLink from 'next/link';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
  clickHandler?();
}

export const Logo = ({ clickHandler = null }: LogoProps) => {
  const logoClickFixer = clickHandler ? { onClick: (e: SyntheticEvent) => { clickHandler(); e.stopPropagation(); e.preventDefault(); } } : {};

  return (
    <NextLink href="/">
      <a href="/" className={styles.logo}>
        🎴 
        <span><i>memory</i>&nbsp;<strong>game</strong></span>
      </a>
    </NextLink>
  )
};

export default Logo;