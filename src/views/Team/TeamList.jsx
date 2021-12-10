import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTeamById, getTeams } from '../../services/teams.js';
import './Team.css';

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = ({ id }) => {
    deleteTeamById(id).then(() => freshenTeams());
  };

  const freshenTeams = () => {
    getTeams()
      .then((newTeams) => setTeams(newTeams))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    freshenTeams();
  }, []);

  return (
    <div style={{ backgroundImage: 'url(team.jpg)' }} className='team-page'>
      <h1>List of Teams</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {teams.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/teams/${id}`}>{name}</Link>
              <button onClick={() => handleDelete({ id })}>DELETE</button>
              <Link to={`/teams/update/${id}`}>
                <button>UPDATE</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className='acknowledgement'>
        Photo by Dio Hasbi Saniskoro from Pexels
      </div>
    </div>
  );
}
