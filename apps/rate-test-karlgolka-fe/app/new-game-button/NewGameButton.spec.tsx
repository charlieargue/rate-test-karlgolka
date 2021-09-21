import React from 'react';
import { render } from '@testing-library/react';

import NewGameButton from './NewGameButton';

describe('NewGameButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewGameButton />);
    expect(baseElement).toBeTruthy();
  });
});
