import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import TeamList from './TeamList';

it('should render a team list view', async () => {
  render(
    <MemoryRouter>
      <Route component={TeamList} />
    </MemoryRouter>
  );

  const loading = screen.getByText(/Loading/i);
  expect(loading).toBeInTheDocument();

  const team = await screen.findByText(/Teams/i);

  expect(team).toBeInTheDocument();
});
