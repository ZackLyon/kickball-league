import React, { useState } from 'react';
import { createPlayer } from '../../services/players.js';
import { useHistory } from 'react-router-dom';
import PlayerForm from '../../components/PlayerForm.jsx';

export default function CreatePlayer() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState(1);
  const history = useHistory();
  const isCreate = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const freshPlayer = await createPlayer({ name, position, teamId });

    history.push(`/players/${freshPlayer[0].id}`);
  };

  return (
    <div>
      <PlayerForm
        {...{
          isCreate,
          name,
          setName,
          position,
          setPosition,
          handleSubmit,
          setTeamId,
        }}
      />
    </div>
  );
}
