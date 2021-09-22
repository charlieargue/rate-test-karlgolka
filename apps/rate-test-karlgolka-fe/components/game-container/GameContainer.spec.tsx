import React from 'react';
import { render } from '@testing-library/react';

import GameContainer from './GameContainer';

describe('GameContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameContainer />);
    expect(baseElement).toBeTruthy();
  });
});
