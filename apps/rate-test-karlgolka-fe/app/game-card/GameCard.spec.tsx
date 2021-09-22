import React from 'react';
import { render } from '@testing-library/react';

import GameCard from './GameCard';

describe('GameCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameCard card={null} />);
    expect(baseElement).toBeTruthy();
  });
});
