import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerById } from '../../services/players.js';

export default function PlayerDetail() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPlayerById(id).then((player) => setPlayer(player));
  }, [id]);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>{player.name}</h1>
      <h3>{player.position}</h3>
      <div>Team: {player.teams.name}</div>
    </div>
  );
}
