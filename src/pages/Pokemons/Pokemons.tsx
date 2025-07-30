import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
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

  const fetchPokemons = async () => {
    try {
      const listRes = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      const results: PokemonListItem[] = listRes.data.results;

      // const detailsPromises = results.map((pokemon) => axios.get(pokemon.url));
      // const detailsResponses = await Promise.all(detailsPromises);

      // const detailedData: PokemonDetail[] = detailsResponses.map(
      //   (res) => res.data
      // );
      setPokemonList(results);
      // setError("Failed to load Pokémon data. Please try again.");
    } catch (err) {
      setError("Failed to load Pokémon data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);
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

      <Row className="g-4">
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard
              name={pokemon.name}
              url={pokemon.url}
              // id={1}
              // description={`#${pokemon.id.toString().padStart(3, "0")}`}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Pokemons;
