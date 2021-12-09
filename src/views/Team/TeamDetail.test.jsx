import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import TeamDetail from './TeamDetail';

it('should render a team detail view', async () => {
  render(
    <MemoryRouter initialEntries={['/teams/4']}>
      <Route path='/teams/:id' component={TeamDetail} />
    </MemoryRouter>
  );

  const loading = screen.getByText(/Loading/i);
  expect(loading).toBeInTheDocument();

  const team = await screen.findByText(/Mt. Hoodies/i);

  expect(team).toBeInTheDocument();
});
