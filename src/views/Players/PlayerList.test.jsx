import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PlayerList from './PlayerList';

it('should render a Player list view', async () => {
  render(
    <MemoryRouter>
      <Route component={PlayerList} />
    </MemoryRouter>
  );

  const loading = screen.getByText(/Loading/i);
  expect(loading).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const player = await screen.findByText(/Players/i);

  expect(player).toBeInTheDocument();
});
