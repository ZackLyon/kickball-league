import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePlayerById, getPlayers } from '../../services/players.js';
import './Player.css';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const freshenPlayers = () => {
    getPlayers()
      .then((players) => setPlayers(players))
      .then(() => setLoading(false));
  };
  const handleDelete = (id) => {
    deletePlayerById(id).then(() => freshenPlayers());
  };

  useEffect(() => {
    freshenPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      style={{ backgroundImage: 'url(players.jpg)' }}
      className='players-page'
    >
      <h1>List of Players</h1>
      <ul>
        {players.map(({ name, position, id }) => (
          <li key={id}>
            <span>
              {position} : {name}
            </span>
            <Link to={`/players/${id}`}>
              <button>VIEW</button>
            </Link>
            <button onClick={() => handleDelete(id)}>DELETE</button>
            <Link to={`/players/update/${id}`}>
              <button>UPDATE</button>
            </Link>
          </li>
        ))}
      </ul>
      <div className='acknowledgement'>Photo by Thirdman from Pexels</div>
    </div>
  );
}
