import React, { useState, useEffect } from 'react';
import { getTeamById, updateTeamById } from '../../services/teams.js';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateTeam() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getTeamById(id).then(({ name, city, state }) => {
      setName(name);
      setCity(city);
      setState(state);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTeamById(id, { name, city, state });

    history.push(`/teams`);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label>
          City:
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </label>
        <label>
          State:
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></input>
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
