import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePlayerById, getPlayers } from '../../services/players.js';
import './Player.css';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  const freshenPlayers = () => {
    getPlayers().then((players) => setPlayers(players));
  };
  const handleDelete = (id) => {
    deletePlayerById(id).then(() => freshenPlayers());
  };

  useEffect(() => {
    freshenPlayers();
  }, []);

  if (!players.length) return <div>Loading...</div>;

  return (
    <div
      style={{ backgroundImage: 'url(players.jpg)' }}
      className='players-page'
    >
      <h1>List of Players</h1>
      <ul>
        {players.map(({ name, position, id }) => (
          <li key={id}>
            <Link to={`/players/${id}`}>
              {position} : {name}
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
