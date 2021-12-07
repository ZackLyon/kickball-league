import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTeamById } from '../../services/teams.js';

export default function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    getTeamById(id).then((newTeam) => setTeam(newTeam));
  }, [id]);

  if (!team) return <div>Loading</div>;

  console.log(team.players);

  return (
    <div>
      <h1>{team.name}</h1>
      <h3>{team.city}</h3>
      <ul>
        {team.players
          ? team.players.map((player) => (
              <li key={player.id}>
                <span>{player.position}</span> : {player.name}
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
}
