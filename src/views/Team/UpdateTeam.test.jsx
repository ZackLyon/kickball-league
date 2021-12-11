import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import UpdateTeam from './UpdateTeam.jsx';
import TeamDetail from './TeamDetail.jsx';

const mockTeam = {
  id: 100,
  created_at: '2021-12-10T01:29:22.974Z',
  name: 'test name',
  city: 'kalamazoo',
  state: 'OR',
  players: [],
};

const server = setupServer(
  rest.get(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/teams`,
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  ),
  rest.patch(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/teams`,
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should allow a user to update a team and redirect to the team list view', async () => {
  const history = createMemoryHistory();
  history.push('/teams/update/100');

  render(
    <Router history={history}>
      <Route path='/teams/update/:id'>
        <UpdateTeam />
      </Route>
      <Route path='/teams/:id' component={TeamDetail} />
    </Router>
  );

  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.click(submit);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await screen.findByText(/kalamazoo/i);
});
