import { Card } from "react-bootstrap";
import "./pokemon-card.scss";

interface CardProps {
  url: string;
  name: string;
}

const PokemonCard: React.FC<CardProps> = ({ name, url }) => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  const number = match ? parseInt(match[1], 10) : 0;
  const formattedId = `#${number.toString().padStart(3, "0")}`;

  return (
    <Card className="pokemon_card">
      <div className="pokemon_card-container">
        <Card.Img
          variant="top"
          className="img-fluid pokemon_card-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
          //  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
          alt={name}
        />
      </div>
      <Card.Body>
        <Card.Title className="text-center text-capitalize">{name}</Card.Title>
        <Card.Text className="text-center pokemon_card-desc">
          {formattedId}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
