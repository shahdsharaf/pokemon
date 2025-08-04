import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pokemons.scss";
import { Row, Col, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import PageHeader from "../../components/PageHeader/PageHeader";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

interface PokemonListItem {
  name: string;
  url: string;
}

const Pokemons: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"paginated" | "infinite">(
    "paginated"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchPokemons = async () => {
    try {
      const listRes = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=120&offset=0"
      );
      const results: PokemonListItem[] = listRes.data.results;
      setPokemonList((prev) => [...prev, ...results]);
    } catch (err) {
      setError("Failed to load Pokémon data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleModeChange = (mode: "paginated" | "infinite") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const paginatedData = pokemonList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error)
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );

  return (
    <div className="container mt-4">
      <PageHeader
        className=""
        description="Discover and explore Pokemon with infinite scroll"
        title="Pokedex"
      />
      <div className="pagination-buttons d-flex justify-content-center mb-3">
        <Button
          className={`me-2 custom-toggle-btn ${
            viewMode === "paginated" ? "active" : ""
          }`}
          variant="outline-primary"
          onClick={() => handleModeChange("paginated")}
        >
          Page Controls
        </Button>
        <Button
          className={`custom-toggle-btn ${
            viewMode === "infinite" ? "active" : ""
          }`}
          variant="outline-primary"
          onClick={() => handleModeChange("infinite")}
        >
          Infinite Scroll
        </Button>
      </div>
      <Row className="g-4">
        {(viewMode === "paginated" ? paginatedData : pokemonList).map(
          (pokemon) => (
            <Col key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
              <PokemonCard name={pokemon.name} url={pokemon.url} />
            </Col>
          )
        )}
      </Row>

      {viewMode === "paginated" && (
        <Pagination className="justify-content-center mt-4 custom-pagination">
          <Pagination.Prev
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={currentPage === idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
  );
};

export default Pokemons;
