import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home.jsx';
import PlayerList from './views/Players/PlayerList.jsx';
import TeamList from './views/Team/TeamList.jsx';
import TeamDetail from './views/Team/TeamDetail.jsx';
import PlayerDetail from './views/Players/PlayerDetail.jsx';
import CreateTeam from './views/Team/CreateTeam.jsx';
import UpdateTeam from './views/Team/UpdateTeam.jsx';
import CreatePlayer from './views/Players/CreatePlayer.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div>
            <Link to='/'>Home</Link>
          </div>
          <div>
            <Link to='/teams'>Teams</Link>
          </div>
          <div>
            <Link to='/players'>Players</Link>
          </div>
          <div>
            <Link to='/teams/freshteam'>Create Team</Link>
          </div>
          <div>
            <Link to='/players/freshplayer'>Create Player</Link>
          </div>
        </nav>

        <Switch>
          <Route path='/players/freshplayer'>
            <CreatePlayer />
          </Route>
          <Route path='/players/:id'>
            <PlayerDetail />
          </Route>
          <Route path='/players'>
            <PlayerList />
          </Route>
          <Route path='/teams/freshteam'>
            <CreateTeam />
          </Route>
          <Route path='/teams/update/:id'>
            <UpdateTeam />
          </Route>
          <Route path='/teams/:id'>
            <TeamDetail />
          </Route>
          <Route path='/teams'>
            <TeamList />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
