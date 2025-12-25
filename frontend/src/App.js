import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import GameEdit from "./components/GameEdit";
import GameCreate from "./components/GameCreate";
import { GamesProvider } from "./contexts/GamesContext";
import { GenresProvider } from "./contexts/GenresContext";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <GenresProvider>
      <BrowserRouter>
        <GamesProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="games/:gameId" element={<GameEdit />} />
              <Route path="games/new" element={<GameCreate />} />
            </Route>
            <Route path="privacy-policy" element={<PageNotFound id={0} />} />
            <Route path="terms-of-services" element={<PageNotFound id={0} />} />
            <Route path="contact-us" element={<PageNotFound id={0} />} />
            <Route path="*" element={<PageNotFound id={1} />} />
          </Routes>
        </GamesProvider>
      </BrowserRouter>
    </GenresProvider>
  );
}

export default App;
