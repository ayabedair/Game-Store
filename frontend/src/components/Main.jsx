import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useGames } from "../contexts/GamesContext";

const Main = () => {
  const navigate = useNavigate();
  const { games, deleteGame } = useGames();
  console.log(games);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  function handleDeleteGame(id) {
    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteGame(id);
    }
  }

  return (
    <main className="main-container">
      <div className="games-section">
        <div className="section-header">
          <h2>🎮 Your Games List</h2>
        </div>

        <div className="table-header">
          <p>Showing {games.length} games</p>

          <div className="table-header-middle">
            <button
              className="btn-colored"
              onClick={() => navigate("/games/new")}
            >
              ➕ Add New Game
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="games-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Release Date</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={game.id}>
                  <td className="index-column">{index + 1}</td>
                  <td className="game-name">
                    <div className="game-name-content">
                      <span className="game-icon">🎯</span>
                      <span>{game.name}</span>
                    </div>
                  </td>
                  <td className="price-column">
                    <span className="price-tag">{game.price}</span>
                  </td>
                  <td className="date-column">
                    {formatDate(game.releaseDate)}
                  </td>
                  <td className="genre-column">
                    <span className="genre-badge">{game.genre}</span>
                  </td>
                  <td className="actions-column">
                    <button
                      className="btn-view"
                      onClick={() => navigate(`games/${game.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => handleDeleteGame(game.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Main;
