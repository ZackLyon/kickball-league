import React, { useState, useEffect } from 'react';
import { getPlayerById, updatePlayerById } from '../../services/players.js';
import { useHistory, useParams } from 'react-router-dom';
import PlayerForm from '../../components/PlayerForm.jsx';

export default function UpdatePlayer() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const isCreate = false;

  useEffect(() => {
    getPlayerById(id)
      .then(({ name, position, team_id }) => {
        console.log(team_id);
        setName(name);
        setPosition(position);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updatePlayerById(id, { name, position });

    history.push(`/players`);
  };

  if (loading) return <div>Loading...</div>;

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
        }}
      />
    </div>
  );
}
