import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../services/teams.js';
import './Team.css';

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((newTeams) => setTeams(newTeams));
  }, []);

  if (!teams.length) return <div>Loading</div>;

  return (
    <div style={{ backgroundImage: 'url(team.jpg)' }} className='team-page'>
      <h1>List of Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
      <div className='acknowledgement'>
        Photo by Dio Hasbi Saniskoro from Pexels
      </div>
    </div>
  );
}
