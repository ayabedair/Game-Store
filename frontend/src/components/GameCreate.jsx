import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGames } from "../contexts/GamesContext";
import "../index.css";
import { useGenres } from "../contexts/GenresContext";

const GameEdit = () => {
  const navigate = useNavigate();
  const { getGame, createGame } = useGames();
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      getGame(gameId);
    }
  }, [gameId, getGame]);

  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [genreId, setGenreId] = useState(null);

  const genres = useGenres();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(genreId);
    const newGame = {
      name: gameName,
      genreId: Number(genreId),
      price: Number(price),
      releaseDate: releaseDate,
    };
    await createGame(newGame);
    navigate("/");
  }

  const handleCancel = () => {
    let confirmed = true;
    if (gameName || price || releaseDate || genreId) {
      confirmed = window.confirm("Cancel without saving?");
    }
    confirmed && navigate("/");
  };

  return (
    <div className="game-edit-container">
      <h2 className="game-edit-title">Add Game</h2>

      <form onSubmit={handleSubmit} className="game-edit-form">
        <div className="form-group">
          <label className="form-label">Game Name *</label>
          <input
            type="text"
            name="name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Release Date *</label>
          <input
            type="date"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Genre *</label>
          <select
            name="genreId"
            value={genreId}
            onChange={(e) => setGenreId(Number(e.target.value))}
            required
            className="form-input"
          >
            <option value="">Select...</option>
            {genres.map((genreItem) => (
              <option key={genreItem.id} value={genreItem.id}>
                {genreItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save Game
          </button>

          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameEdit;
