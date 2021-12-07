import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home.jsx';
import PlayerList from './views/Players/PlayerList.jsx';
import TeamList from './views/Team/TeamList.jsx';

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
        </nav>

        <Switch>
          <Route path='/players'>
            <PlayerList />
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
