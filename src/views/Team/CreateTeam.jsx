import React, { useState } from 'react';
import { createTeam } from '../../services/teams.js';
import { useHistory } from 'react-router-dom';
import TeamForm from '../../components/TeamForm.jsx';

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
      <TeamForm
        {...{ name, setName, city, setCity, state, setState, handleSubmit }}
      />
    </div>
  );
}
