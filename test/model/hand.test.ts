import Hand from '../../src/model/hand';
import PlayingCard, { Suit, Rank } from '../../src/model/playingcard';

describe('Hand', () => {
  it('should not score face down cards', () => {
    expect.assertions(1);
    const card = new PlayingCard(Suit.Clubs, 2);
    card.setFaceUp(false);
    expect(Hand.score([card])).toBe(0);
  });

  it('should score hand with 0 aces correctly', () => {
    expect.assertions(1);
    const ranks = [4, 5, 6];
    const cards = ranks.map((rank) => new PlayingCard(Suit.Clubs, rank));
    expect(Hand.score(cards)).toBe(ranks.reduce((a, b) => a + b));
  });

  it('should get 20 from an ace and a 9', () => {
    expect.assertions(1);
    expect(Hand.score([
      new PlayingCard(Suit.Clubs, Rank.Ace),
      new PlayingCard(Suit.Diamonds, Rank.Nine),
    ])).toBe(20);
  });

  it('should get 21 from an ace and a face card', () => {
    expect.assertions(1);
    expect(Hand.score([
      new PlayingCard(Suit.Clubs, Rank.Ace),
      new PlayingCard(Suit.Diamonds, Rank.King),
    ])).toBe(21);
  });

  it('should score hand with 2 aces correctly', () => {
    expect.assertions(1);
    const nonAceRanks = [2, 3, 5];
    const cards = [new PlayingCard(Suit.Clubs, Rank.Ace), new PlayingCard(Suit.Diamonds, Rank.Ace)];
    nonAceRanks.forEach((rank) => cards.push(new PlayingCard(Suit.Clubs, rank)));
    expect(Hand.score(cards)).toBe(2 + nonAceRanks.reduce((a, b) => a + b));
  });

  it('should reveal all face down cards', () => {
    expect.assertions(5);
    const cards: PlayingCard[] = [];
    for (let i = 1; i <= 5; i++) {
      const card = new PlayingCard(Suit.Clubs, i);
      card.setFaceUp(false);
      cards.push(card);
    }
    Hand.reveal(cards);
    cards.forEach((card) => expect(card.faceUp).toBe(true));
  });
});
