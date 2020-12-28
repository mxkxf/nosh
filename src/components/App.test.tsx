import { fireEvent } from '@testing-library/react';
import React from 'react';

import { render } from '../testUtils';
import App from './App';

describe('App', () => {
  it('shows a welcome screen if not subscribed to any feeds', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome'));
  });

  it('should display information about the app', () => {
    const { queryByText, getByLabelText } = render(<App />);

    fireEvent.click(getByLabelText('Logo'));

    expect(queryByText('Hey there'));
  });
});
