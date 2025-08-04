import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./pokemon-page.scss";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  ProgressBar,
  Badge,
} from "react-bootstrap";

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      [key: string]: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number;
}

const PokemonPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setPokemon(res.data);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error || !pokemon)
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );

  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;
  const image = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <Container className="mt-4">
      <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
        ⬅ Back to List
      </Button>
      <div
        className="p-4 rounded"
        style={{
          background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-0">
          ⚡ {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
        <p className="text-center">{formattedId}</p>
      </div>
      <Row className="mt-4">
        <Col md={5} className="text-center">
          <img
            src={image}
            alt={pokemon.name}
            className="img-fluid pokemon-image"
          />
          <div className="d-flex justify-content-center mt-3">
            {pokemon.types.map((typeObj, idx) => (
              <Badge bg="danger" key={idx} className="mx-1 text-capitalize">
                {typeObj.type.name}
              </Badge>
            ))}
          </div>
          <Row className="mt-3 text-center">
            <Col className="height-weight-box">
              <div>📏 Height</div>
              <strong>{pokemon.height / 10} m</strong>
            </Col>
            <Col className="height-weight-box">
              <div>⚖️ Weight</div>
              <strong>{pokemon.weight / 10} kg</strong>
            </Col>
          </Row>
        </Col>

        <Col md={7}>
          <h5>Base Stats</h5>
          {pokemon.stats.map((stat, idx) => (
            <div key={idx} className="mb-2">
              <strong className="text-capitalize">{stat.stat.name}</strong>
              <ProgressBar now={stat.base_stat} label={stat.base_stat} />
            </div>
          ))}

          <h5 className="mt-4">Abilities</h5>
          {pokemon.abilities.map((ab, idx) => (
            <div key={idx}>
              <span
                className={`text-capitalize ability-name ${
                  ab.is_hidden ? "hidden-ability" : "visible-ability"
                }`}
              >
                {ab.ability.name}
              </span>{" "}
              {ab.is_hidden && <span className="text-muted">(Hidden)</span>}
            </div>
          ))}

          <h5 className="mt-4">Base Experience</h5>
          <strong className="base-exp-num">{pokemon.base_experience} XP</strong>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
