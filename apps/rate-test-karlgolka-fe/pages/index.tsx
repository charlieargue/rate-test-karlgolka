import React from 'react';
import Card from '../app/card/Card';

import styles from './index.module.scss';

// aka Game Container
export function Index() {
  return (
    <div className={styles.page}>
      <Card />
    </div>
  );
}

export default Index;
