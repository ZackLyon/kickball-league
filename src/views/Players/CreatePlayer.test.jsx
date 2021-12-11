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
import CreatePlayer from './CreatePlayer.jsx';
import PlayerDetail from './PlayerDetail.jsx';

const mockPlayer = {
  id: 100,
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
      return res(ctx.json(mockPlayer));
    }
  ),
  rest.post(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/players`,
    (req, res, ctx) => {
      return res(ctx.json([mockPlayer]));
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

it('should allow a user to create a new player and redirect to the player detail view', async () => {
  const history = createMemoryHistory();
  history.push('/players/freshplayer');

  render(
    <Router history={history}>
      <Route path='/players/freshplayer'>
        <CreatePlayer />
      </Route>
      <Route path='/players/:id' component={PlayerDetail} />
    </Router>
  );

  screen.getAllByText(/Loading/i);

  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));

  const name = screen.getByLabelText(/name/i);
  const position = screen.getByLabelText(/position/i);
  const submit = screen.getByRole('button', { name: /submit/i });

  userEvent.type(name, 'test name');
  userEvent.type(position, 'umpire');
  // userEvent.click(submit);

  await screen.findByText(/umpire/i);
});
