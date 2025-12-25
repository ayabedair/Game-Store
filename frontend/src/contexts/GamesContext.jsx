import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGenres } from "./GenresContext";

const GamesContext = createContext();

const BASE_URL = "http://localhost:5042";

function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { genres } = useGenres();

  useEffect(function () {
    async function fetchGames() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/games`);
        if (!res.ok) {
          throw new Error(`Failed to fetch games: ${res.status}`);
        }
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGames();
  }, []);

  const getGame = useCallback(
    async function getGame(id) {
      if (Number(id) === currentGame.id) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/games/${id}`);
        const data = await res.json();
        setCurrentGame(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentGame.id]
  );

  async function editGame(game) {
    console.log(game);
    try {
      setIsLoading(true);
      setError(null);

      if (!game || !game.id) {
        throw new Error("Game ID is required for editing");
      }

      const sendGame = {
        name: game.name,
        genreId: Number(game.genreId),
        price: Number(game.price),
        releaseDate: game.releaseDate,
      };

      const res = await fetch(`${BASE_URL}/games/${game.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendGame),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Server error response:", errorText);
        throw new Error(
          `Failed to update game: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const gameGenre = genres.find((genre) => genre.id === game.genreId);
      const genreName = gameGenre ? gameGenre.name : "Unknown Genre";
      const updatedGame = {
        id: game.id,
        name: game.name,
        genre: genreName,
        price: game.price,
        releaseDate: game.releaseDate,
      };

      setGames((prevGames) =>
        prevGames.map((g) => (g.id === game.id ? updatedGame : g))
      );

      return { success: true };
    } catch (err) {
      console.error("💥 Error updating game:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteGame(id) {
    try {
      setIsLoading(true);
      setError(null);
      await fetch(`${BASE_URL}/games/${id}`, {
        method: "DELETE",
      });
      setGames((prevGames) => prevGames.filter((game) => game.id !== id));
      setCurrentGame({});
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createGame(newGame) {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/games`, {
        method: "POST",
        body: JSON.stringify(newGame),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      const gameState = toGamesState(data);

      setGames((prevGames) => [...prevGames, gameState]);
      // setCurrentGame({});
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    console.log(games);
  }

  // TODO: move to helpers after fetching genres

  function toGamesState(game) {
    const gameGenre = genres.find((genre) => genre.id === game.genreId);
    const genreName = gameGenre ? gameGenre.name : "Unknown Genre";

    const gameState = {
      id: game.id,
      name: game.name,
      genre: genreName,
      price: game.price,
      releaseDate: game.releaseDate,
    };

    return gameState;
  }

  return (
    <GamesContext.Provider
      value={{
        games,
        getGame,
        editGame,
        deleteGame,
        createGame,
        currentGame,
        isLoading,
        error,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the Cities provider");
  return context;
}

export { GamesProvider, useGames };
