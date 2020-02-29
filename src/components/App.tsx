import React, { useState, useEffect } from 'react';
import Hand from './Hand';
import Deck from '../model/deck';
import PlayingCard from '../model/playingcard';
import './styles/app.scss';

const App = () => {
  const [deck] = useState(new Deck());
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);

  useEffect(() => {
    if (playerTurn === null) {
      setDealerHand([deck.drawCard(), deck.drawCard(false)]);
      setPlayerHand([deck.drawCard(), deck.drawCard()]);
      setPlayerTurn(true);
    }
  }, [deck, playerTurn]);

  return (
    <>
      <Hand hand={dealerHand} title="Dealer's Hand" />
      <Hand hand={playerHand} title="Player's Hand" />
    </>
  );
};

export default App;
