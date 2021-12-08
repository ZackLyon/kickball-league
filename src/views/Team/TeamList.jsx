import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../services/teams.js';

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((newTeams) => setTeams(newTeams));
  }, []);

  if (!teams.length) return <div>Loading</div>;

  return (
    <ul>
      {teams.map((team) => (
        <li key={team.id}>
          <Link to={`/teams/${team.id}`}>{team.name}</Link>
        </li>
      ))}
    </ul>
  );
}
