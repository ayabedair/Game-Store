import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGames } from "../contexts/GamesContext";
import "../index.css";

const GameEdit = () => {
  const navigate = useNavigate();
  const { getGame, editGame, currentGame } = useGames();
  const { gameId } = useParams();

  // TODO: set initail values on each render
  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (gameId) {
      getGame(gameId);
    }

    // set initail values
    if (currentGame) {
      setGameName(currentGame.name);
      setPrice(currentGame.price);
      setReleaseDate(currentGame.releaseDate);
      setGenre(currentGame.genreId.toString());
    }
  }, [gameId, getGame, currentGame]);
  console.log(currentGame);

  console.log(currentGame);

  const genres = [
    { id: 1, name: "Fighting" },
    { id: 2, name: "Roleplaying" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Racing" },
    { id: 5, name: "Kids and Family" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(genre);
    const updatedGame = {
      id: Number(gameId),
      name: gameName,
      genreId: Number(genre),
      price: Number(price),
      releaseDate: releaseDate,
    };
    console.log(updatedGame);
    editGame(updatedGame);
    navigate("/");
  };

  const handleCancel = () => {
    if (window.confirm("Cancel without saving?")) {
      navigate("/");
    }
  };

  return (
    <div className="game-edit-container">
      <h2 className="game-edit-title">Edit Game</h2>

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
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select an option</option>
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
