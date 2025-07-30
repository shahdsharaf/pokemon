import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Pokemons from "./pages/Pokemons/Pokemons";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemons" element={<Pokemons />} />
      {/* <Route path="/pokemons/:id" element={<h1>poekon</h1>} /> */}
    </Routes>
  );
};

export default App;
