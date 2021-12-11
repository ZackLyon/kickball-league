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
import UpdatePlayer from './UpdatePlayer.jsx';
import PlayerList from './PlayerList.jsx';

const mockPlayer = {
  id: 13,
  created_at: '2021-12-10T01:29:22.974Z',
  name: 'test name',
  position: 'umpire',
  team_id: 1,
  teams: {
    name: 'something',
  },
};

const server = setupServer(
  rest.get(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/players`,
    (req, res, ctx) => {
      return res(ctx.json([mockPlayer]));
    }
  ),
  rest.patch(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/players`,
    (req, res, ctx) => {
      return res(ctx.json(mockPlayer));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/teams`,
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should allow a user to update a player and redirect to the player list view', async () => {
  const history = createMemoryHistory();
  history.push('/players/update/13');

  render(
    <Router history={history}>
      <Route path='/players/update/:id'>
        <UpdatePlayer />
      </Route>
      <Route path='/players' component={PlayerList} />
    </Router>
  );

  screen.getAllByText(/Loading/i);

  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));

  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.click(submit);

  await screen.findByText(/test name/i);
});
