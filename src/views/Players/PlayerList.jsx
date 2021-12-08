import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlayers } from '../../services/players.js';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then((players) => setPlayers(players));
  }, []);

  if (!players) return <div>Loading...</div>;
  console.log(players);
  return (
    <div>
      <ul>
        {players.map(({ name, position, id }) => (
          <Link to={`/players/${id}`}>
            <li key={id}>
              {position} : {name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
