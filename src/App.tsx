import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Pokemons from "./pages/Pokemons/Pokemons";
import PokemonPage from "./pages/PokemonPage/PokemonPage";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemons" element={<Pokemons />} />
      <Route path="/pokemon/:id" element={<PokemonPage />} />
    </Routes>
  );
};

export default App;
