import React, { useState } from 'react';
import { createTeam } from '../../services/teams.js';
import { useHistory } from 'react-router-dom';

export default function CreateTeam() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const freshTeam = await createTeam({ name, city, state });

    history.push(`/teams/${freshTeam[0].id}`);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input type='text' onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label>
          City:
          <input type='text' onChange={(e) => setCity(e.target.value)}></input>
        </label>
        <label>
          State:
          <input type='text' onChange={(e) => setState(e.target.value)}></input>
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
