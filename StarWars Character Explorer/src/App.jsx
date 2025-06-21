import React from "react";
import "./App.css";

export default function App() {
  const [starWarsData, setStarWarsData] = React.useState(null);
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const MAX_CHARACTERS = 83;

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://swapi.py4e.com/api/people/${count}`)
      .then(res => {
        if (!res.ok) throw new Error("Character not found");
        return res.json();
      })
      .then(data => {
        setStarWarsData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [count]);

  function handleNext() {
    if (count < MAX_CHARACTERS) setCount(prev => prev + 1);
  }

  function handlePrevious() {
    if (count > 1) setCount(prev => prev - 1);
  }

  function handleRandom() {
    const randomId = Math.floor(Math.random() * MAX_CHARACTERS) + 1;
    setCount(randomId);
  }

  const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${count}.jpg`;

  return (
    <div className="container">
      <h1 className="title">🌌 Star Wars Character Explorer</h1>

      <div className="nav">
        <button onClick={handlePrevious} disabled={count === 1} className="button">⬅️ Previous</button>
        <button onClick={handleRandom} className="button">🎲 Random</button>
        <button onClick={handleNext} disabled={count === MAX_CHARACTERS} className="button">Next ➡️</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : starWarsData ? (
        <div className="card">
          <img src={imgUrl} alt={starWarsData.name} className="image" onError={(e) => e.target.style.display = 'none'} />
          <h2 className="name">{starWarsData.name}</h2>
          <p><strong>Height:</strong> {starWarsData.height} cm</p>
          <p><strong>Mass:</strong> {starWarsData.mass} kg</p>
          <p><strong>Hair Color:</strong> {starWarsData.hair_color}</p>
          <p><strong>Skin Color:</strong> {starWarsData.skin_color}</p>
          <p><strong>Birth Year:</strong> {starWarsData.birth_year}</p>
          <p><strong>Gender:</strong> {starWarsData.gender}</p>
        </div>
      ) : null}
    </div>
  );
}
