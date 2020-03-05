import React, { useState, useEffect } from 'react';
import Hand from './Hand';
import Controls from './Controls';
import Deck from '../model/deck';
import PlayingCard from '../model/playingcard';

const App = () => {
  const [deck] = useState(new Deck());
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);
  const [buttons, setButtons] = useState({ hit: true, stand: true });

  const hit = () => setPlayerHand((hand) => [...hand, deck.drawCard()]);

  const stand = () => {
    dealerHand.forEach((card) => card.setFaceUp(true));
    setButtons({ hit: false, stand: false });
    setPlayerTurn(false);
  };

  useEffect(() => {
    if (playerTurn === null) {
      setDealerHand([deck.drawCard(), deck.drawCard(false)]);
      setPlayerHand([deck.drawCard(), deck.drawCard()]);
      setPlayerTurn(true);
    }
  }, [deck, playerTurn]);

  return (
    <>
      <Controls hit={hit} stand={stand} enabled={buttons} />
      <Hand hand={dealerHand} title="Dealer's Hand" />
      <Hand hand={playerHand} title="Player's Hand" />
    </>
  );
};

export default App;
