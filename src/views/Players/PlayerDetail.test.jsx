import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';

it('should render a player detail view', async () => {
  render(
    <MemoryRouter initialEntries={['/players/11']}>
      <Route path='/players/:id' component={PlayerDetail} />
    </MemoryRouter>
  );

  const loading = screen.getByText(/Loading/i);
  expect(loading).toBeInTheDocument();

  const player = await screen.findByText(/Team/i);

  expect(player).toBeInTheDocument();
});
