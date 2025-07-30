import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h1 className="mb-4">Welcome to Pokémon Browser</h1>
      <Button onClick={() => navigate("/pokemons")} variant="primary">
        Go to Pokémons
      </Button>
    </Container>
  );
};

export default Home;
