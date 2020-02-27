import React from 'react';
import PlayingCard from '../model/playingcard';
import './styles/card.scss';

interface CardProps {
  card: PlayingCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  // Face-down card
  if (!card.faceUp()) return <div className="card" />;

  // Face-up card
  return (
    <div className={`card card-${card.suitName()}`} id={card.rank()}>
      <p className="symbol">
        {card.suit()}
      </p>
    </div>
  );
};

export default Card;
