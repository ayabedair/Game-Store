import { createContext, useContext, useEffect, useState } from "react";

const GenresContext = createContext();

const BASE_URL = "http://localhost:5042";

function GenresProvider({ children }) {
  const [genres, setGenres] = useState({});

  useEffect(function () {
    async function fetchGenres() {
      const res = await fetch(`${BASE_URL}/genres`);
      const data = await res.json();
      console.log(data);
      setGenres(data);
    }
    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
}

function useGenres() {
  const context = useContext(GenresContext);
  if (context === undefined)
    throw new Error("GenresContext was used outside of the Genres provider");
  return context;
}

export { GenresProvider, useGenres };
