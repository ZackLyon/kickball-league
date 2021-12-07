import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../services/teams.js';

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams().then((newTeams) => setTeams(newTeams));
  }, []);

  if (!teams.length) return <div>Loading</div>;

  console.log(teams);
  return (
    <ul>
      {teams.map((team) => (
        <Link to={`/teams/${team.id}`}>
          <li key={team.id}>{team.name}</li>
        </Link>
      ))}
    </ul>
  );
}
