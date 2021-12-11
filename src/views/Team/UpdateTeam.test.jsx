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
import CreateTeam from './CreateTeam.jsx';
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
  rest.post(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/teams`,
    (req, res, ctx) => {
      return res(ctx.json([mockTeam]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should allow a user to create a new team and redirect to the team detail view', async () => {
  const history = createMemoryHistory();
  history.push('/teams/freshteam');

  render(
    <Router history={history}>
      <Route path='/teams/freshteam'>
        <CreateTeam />
      </Route>
      <Route path='/teams/:id' component={TeamDetail} />
    </Router>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const name = screen.getByLabelText(/name/i);
  const city = screen.getByLabelText(/city/i);
  const state = screen.getByLabelText(/state/i);
  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.type(name, 'test name');
  userEvent.type(city, 'kalamazoo');
  userEvent.type(state, 'OR');
  userEvent.click(submit);

  await screen.findByText(/kalamazoo/i);
});
