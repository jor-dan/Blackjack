import React, { useState, useEffect, useCallback } from 'react';
import Hand from './Hand';
import Controls from './Controls';
import Deck from '../model/deck';
import BlackjackHand from '../model/hand';
import PlayingCard from '../model/playingcard';

const App = () => {
  const [deck] = useState(new Deck());
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);
  const [buttons, setButtons] = useState({ hit: true, stand: true });

  const hit = () => setPlayerHand((hand) => [...hand, deck.drawCard()]);

  const stand = useCallback(() => {
    setDealerHand((hand) => {
      BlackjackHand.reveal(hand);
      return hand;
    });
    setButtons({ hit: false, stand: false });
    setPlayerTurn(false);
  }, []);

  useEffect(() => {
    if (playerTurn === null) {
      setDealerHand([deck.drawCard(), deck.drawCard(false)]);
      setPlayerHand([deck.drawCard(), deck.drawCard()]);
      setPlayerTurn(true);
    } else if (playerTurn) {
      if (BlackjackHand.score(playerHand) > 21) stand();
    } else if (BlackjackHand.score(dealerHand) < 17) {
      setDealerHand((hand) => [...hand, deck.drawCard()]);
    } else {
      BlackjackHand.reveal(dealerHand);
    }
  }, [deck, playerTurn, playerHand, dealerHand, stand]);

  return (
    <>
      <Controls hit={hit} stand={stand} enabled={buttons} />
      <Hand hand={dealerHand} title={`Dealer (${BlackjackHand.score(dealerHand)})`} />
      <Hand hand={playerHand} title={`Player (${BlackjackHand.score(playerHand)})`} />
    </>
  );
};

export default App;
