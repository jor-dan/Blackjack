import React, { useState, useEffect, useCallback } from 'react';
import Hand from './Hand';
import Controls from './Controls';
import Game, { User, Outcome } from '../model/game';
import PlayingCard from '../model/playingcard';

const App = () => {
  const enum Message {
    play = 'Hit or Stand?',
    win = 'You Won!',
    loss = 'You Lost!',
    tie = 'Tie!',
  }

  const [game] = useState(new Game());
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [buttons, setButtons] = useState({ hit: true, stand: true, reset: true });
  const [message, setMessage] = useState(Message.play);

  const hit = () => setPlayerHand((hand) => [...hand, game.drawCard()]);

  const stand = useCallback(() => {
    setDealerHand((hand) => {
      Game.reveal(hand);
      return hand;
    });
    setButtons({ hit: false, stand: false, reset: true });
    game.setTurn(User.dealer);
  }, [game]);

  const reset = () => {
    game.reset();
    setDealerHand(game.initialHand(User.dealer));
    setPlayerHand(game.initialHand(User.player));
    setButtons({ hit: true, stand: true, reset: true });
    setMessage(Message.play);
  };

  const outcome = useCallback(() => {
    switch (Game.outcome(playerHand, dealerHand)) {
      case Outcome.win:
        setMessage(Message.win);
        break;
      case Outcome.loss:
        setMessage(Message.loss);
        break;
      case Outcome.tie:
        setMessage(Message.tie);
        break;
    }
  }, [playerHand, dealerHand, Message.win, Message.loss, Message.tie]);

  useEffect(() => {
    switch (game.turn()) {
      case undefined:
        setDealerHand(game.initialHand(User.dealer));
        setPlayerHand(game.initialHand(User.player));
        game.setTurn(User.player);
        break;
      case User.player:
        if (Game.busts(playerHand)) stand();
        break;
      case User.dealer:
        if (Game.busts(playerHand) || !Game.dealerShouldDrawCard(dealerHand)) {
          outcome();
        } else {
          setDealerHand((hand) => [...hand, game.drawCard()]);
        }
        break;
    }
  }, [game, playerHand, dealerHand, stand, outcome, buttons]);

  return (
    <>
      <Controls message={message} functions={{ hit, stand, reset }} enabled={buttons} />
      <Hand hand={dealerHand} title={`Dealer (${Game.score(dealerHand)})`} />
      <Hand hand={playerHand} title={`Player (${Game.score(playerHand)})`} />
    </>
  );
};

export default App;
