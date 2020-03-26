import React from 'react';
import Card from './Card';
import PlayingCard from '../model/playingcard';

interface HandProps {
  hand: PlayingCard[];
  title: string;
}

const Hand: React.FC<HandProps> = ({ hand, title }) => (
  <>
    <h3 className="hand-title">{title}</h3>
    {hand.map((card, index) => <Card card={card} key={index} />)}
  </>
);

export default Hand;
