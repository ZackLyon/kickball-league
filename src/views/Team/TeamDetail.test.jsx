import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const team = await screen.findByText(/Team/i);

  expect(team).toBeInTheDocument();
});
