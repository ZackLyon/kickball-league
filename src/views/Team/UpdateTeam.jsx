import React, { useState, useEffect } from 'react';
import { getTeamById, updateTeamById } from '../../services/teams.js';
import { useHistory, useParams } from 'react-router-dom';
import TeamForm from '../../components/TeamForm.jsx';

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
      <TeamForm
        {...{ name, setName, city, setCity, state, setState, handleSubmit }}
      />
    </div>
  );
}
