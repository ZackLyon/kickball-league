import React from 'react';

export default function TeamForm({
  name,
  setName,
  city,
  setCity,
  state,
  setState,
  handleSubmit,
}) {
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
  );
}
