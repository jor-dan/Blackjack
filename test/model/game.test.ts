import Game, { Outcome, User } from '../../src/model/game';
import Deck from '../../src/model/deck';
import Hand from '../../src/model/hand';
import PlayingCard, { Suit } from '../../src/model/playingcard';

describe('Game', () => {
  describe('Outcome', () => {
    it('should determine when dealer loses by busting', () => {
      expect.assertions(1);
      const dealerHand = [10, 9, 8].map((rank) => new PlayingCard(Suit.Clubs, rank));
      expect(Game.outcome([], dealerHand)).toBe(Outcome.win);
    });

    it('should determine when player loses by busting', () => {
      expect.assertions(1);
      const playerHand = [10, 9, 8].map((rank) => new PlayingCard(Suit.Clubs, rank));
      expect(Game.outcome(playerHand, [])).toBe(Outcome.loss);
    });

    it('should determine when player\'s hand beats dealer\'s hand', () => {
      expect.assertions(1);
      const playerHand = [10, 9].map((rank) => new PlayingCard(Suit.Clubs, rank));
      const dealerHand = [9, 8].map((rank) => new PlayingCard(Suit.Clubs, rank));
      expect(Game.outcome(playerHand, dealerHand)).toBe(Outcome.win);
    });

    it('should determine when dealer\'s hand beats player\'s hand', () => {
      expect.assertions(1);
      const playerHand = [8, 7].map((rank) => new PlayingCard(Suit.Clubs, rank));
      const dealerHand = [10, 9].map((rank) => new PlayingCard(Suit.Clubs, rank));
      expect(Game.outcome(playerHand, dealerHand)).toBe(Outcome.loss);
    });

    it('should determine when game results in a tie', () => {
      expect.assertions(1);
      const ranks = [10, 9];
      const playerHand = ranks.map((rank) => new PlayingCard(Suit.Clubs, rank));
      const dealerHand = ranks.map((rank) => new PlayingCard(Suit.Clubs, rank));
      expect(Game.outcome(playerHand, dealerHand)).toBe(Outcome.tie);
    });

    it('should not return an outcome when outcome can\'t be determined', () => {
      expect.assertions(1);
      const playerHand = [new PlayingCard(Suit.Clubs, 10)];
      const dealerHand = [new PlayingCard(Suit.Clubs, 9)];
      expect(Game.outcome(playerHand, dealerHand)).toBeNull();
    });
  });

  it('should draw cards from the deck', () => {
    expect.assertions(2);
    const spy = jest.spyOn(Deck.prototype, 'drawCard');
    const game = new Game();
    const card = game.drawCard();
    expect(card).toStrictEqual(expect.any(PlayingCard));
    expect(spy).toHaveLastReturnedWith(card);
  });

  it('should not set turn by default', () => {
    expect.assertions(1);
    const game = new Game();
    expect(game.turn).toBeUndefined();
  });

  it('should allow turn changes', () => {
    expect.assertions(1);
    const game = new Game();
    game.turn = User.player;
    expect(game.turn).toBe(User.player);
  });

  it('should initially give dealer 1 face up and 1 face down card', () => {
    expect.assertions(2);
    const game = new Game();
    const hand = game.initialHand(User.dealer);
    expect(hand).toHaveLength(2);
    expect(hand[0].faceUp && hand[1].faceUp).toBe(false);
  });

  it('should initially give player two face up cards', () => {
    expect.assertions(2);
    const game = new Game();
    const hand = game.initialHand(User.player);
    expect(hand).toHaveLength(2);
    expect(hand[0].faceUp && hand[1].faceUp).toBe(true);
  });

  it('should determine whether player busts', () => {
    expect.assertions(2);
    const hand = [new PlayingCard(Suit.Clubs, 10), new PlayingCard(Suit.Clubs, 9)];
    expect(Game.busts(hand)).toBe(false);
    hand.push(new PlayingCard(Suit.Clubs, 8));
    expect(Game.busts(hand)).toBe(true);
  });

  it('should determine whether dealer should draw a card', () => {
    expect.assertions(2);
    const hand = [new PlayingCard(Suit.Clubs, 10), new PlayingCard(Suit.Clubs, 6)];
    expect(Game.dealerShouldDrawCard(hand)).toBe(true);
    hand[1] = new PlayingCard(Suit.Clubs, 7);
    expect(Game.dealerShouldDrawCard(hand)).toBe(false);
  });

  it('should reset game correctly', () => {
    expect.assertions(2);
    const spy = jest.spyOn(Deck.prototype, 'refill');
    const game = new Game();
    game.reset();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(game.turn).toBeUndefined();
  });

  it('should get scores', () => {
    expect.assertions(4);
    const spy = jest.spyOn(Hand, 'score');
    const rank = 5;
    const cards = [new PlayingCard(Suit.Clubs, rank)];
    const score = Game.score(cards);
    expect(score).toBe(rank);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(cards);
    expect(spy).toHaveLastReturnedWith(rank);
  });

  it('should reveal cards', () => {
    expect.assertions(2);
    const spy = jest.spyOn(Hand, 'reveal');
    const cards = [new PlayingCard(Suit.Clubs, 5)];
    Game.reveal(cards);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(cards);
  });
});
