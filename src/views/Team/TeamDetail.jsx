import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTeamById } from '../../services/teams.js';
import './Team.css';
import teamPic from '../../assets/team.jpg';

export default function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    getTeamById(id).then((newTeam) => setTeam(newTeam));
  }, [id]);

  if (!team) return <div>Loading</div>;

  return (
    <div style={{ backgroundImage: `url(${teamPic})` }} className='team-page'>
      <h1>Team: {team.name}</h1>
      <h3>From: {team.city}</h3>
      <ul>
        {team.players
          ? team.players.map((player) => (
              <li key={player.id}>
                <span>{player.position}</span> : {player.name}
              </li>
            ))
          : ''}
      </ul>
      <div className='acknowledgement'>
        Photo by Dio Hasbi Saniskoro from Pexels
      </div>
    </div>
  );
}
