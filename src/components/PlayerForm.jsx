import React, { useState, useEffect } from 'react';
import { getTeams } from '../services/teams.js';

export default function PlayerForm({
  isCreate,
  name,
  setName,
  position,
  setPosition,
  handleSubmit,
  setTeamId,
}) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const freshenTeams = () => {
    getTeams()
      .then((newTeams) => setTeams(newTeams))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    freshenTeams();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label>
        position:
        <input
          type='text'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        ></input>
      </label>
      {isCreate ? (
        <label>
          Team:
          <select onChange={(e) => setTeamId(e.target.value)}>
            {teams.map((team) => (
              <option value={team.id}>{team.name}</option>
            ))}
          </select>
        </label>
      ) : (
        ''
      )}
      <button type='submit'>Submit</button>
    </form>
  );
}
