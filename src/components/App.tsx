import React, { useState, useEffect, useCallback } from 'react';
import Hand from './Hand';
import Controls from './Controls';
import Deck from '../model/deck';
import BlackjackHand from '../model/hand';
import PlayingCard from '../model/playingcard';

const App = () => {
  const enum Message {
    play = 'Hit or Stand?',
    win = 'You Won!',
    loss = 'You Lost!',
    tie = 'Tie!',
  }

  const [deck] = useState(new Deck());
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);
  const [buttons, setButtons] = useState({ hit: true, stand: true, reset: true });
  const [message, setMessage] = useState(Message.play);

  const hit = () => setPlayerHand((hand) => [...hand, deck.drawCard()]);

  const stand = useCallback((bust = false) => {
    setDealerHand((hand) => {
      BlackjackHand.reveal(hand);
      return hand;
    });
    setButtons({ hit: false, stand: false, reset: true });
    if (bust) {
      setMessage(Message.loss);
    } else {
      setPlayerTurn(false);
    }
  }, [Message.loss]);

  const reset = () => {
    setButtons({ hit: true, stand: true, reset: true });
    setPlayerTurn(null);
    setDealerHand([]);
    setPlayerHand([]);
    setMessage(Message.play);
    deck.refill();
  };

  const outcome = useCallback((playerScore: number, dealerScore: number) => {
    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage(Message.win);
    } else if (dealerScore > playerScore) {
      setMessage(Message.loss);
    } else {
      setMessage(Message.tie);
    }
  }, [Message.win, Message.loss, Message.tie]);

  useEffect(() => {
    if (playerTurn === null) {
      setDealerHand([deck.drawCard(), deck.drawCard(false)]);
      setPlayerHand([deck.drawCard(), deck.drawCard()]);
      setPlayerTurn(true);
    } else if (playerTurn) {
      if (BlackjackHand.score(playerHand) > 21) stand(true);
    } else {
      const dealerScore = BlackjackHand.score(dealerHand);
      if (dealerScore < 17) {
        setDealerHand((hand) => [...hand, deck.drawCard()]);
      } else {
        outcome(BlackjackHand.score(playerHand), dealerScore);
      }
    }
  }, [deck, playerTurn, playerHand, dealerHand, stand, outcome]);

  return (
    <>
      <Controls message={message} functions={{ hit, stand, reset }} enabled={buttons} />
      <Hand hand={dealerHand} title={`Dealer (${BlackjackHand.score(dealerHand)})`} />
      <Hand hand={playerHand} title={`Player (${BlackjackHand.score(playerHand)})`} />
    </>
  );
};

export default App;
