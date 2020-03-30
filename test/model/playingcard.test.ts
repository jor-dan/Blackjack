import PlayingCard, { Suit, Rank } from '../../src/model/playingcard';

describe('Playing Card', () => {
  const aceOfClubs = new PlayingCard(Suit.Clubs, Rank.Ace);
  const jackOfDiamonds = new PlayingCard(Suit.Diamonds, Rank.Jack);
  const kingOfHearts = new PlayingCard(Suit.Hearts, Rank.King);
  const queenOfSpades = new PlayingCard(Suit.Spades, Rank.Queen);

  it('returns the correct suit', () => {
    expect.assertions(8);
    expect(aceOfClubs.suit).toBe(Suit.Clubs);
    expect(aceOfClubs.suitName()).toBe('Clubs');
    expect(jackOfDiamonds.suit).toBe(Suit.Diamonds);
    expect(jackOfDiamonds.suitName()).toBe('Diamonds');
    expect(kingOfHearts.suit).toBe(Suit.Hearts);
    expect(kingOfHearts.suitName()).toBe('Hearts');
    expect(queenOfSpades.suit).toBe(Suit.Spades);
    expect(queenOfSpades.suitName()).toBe('Spades');
  });

  it('returns the correct rank', () => {
    expect.assertions(5);
    expect(aceOfClubs.rank).toBe('A');
    expect(jackOfDiamonds.rank).toBe('J');
    expect(kingOfHearts.rank).toBe('K');
    expect(queenOfSpades.rank).toBe('Q');
    expect((new PlayingCard(Suit.Clubs, 5)).rank).toBe('5');
  });

  it('returns the correct value', () => {
    expect.assertions(4);
    expect(aceOfClubs.value()).toBe(1);
    expect(jackOfDiamonds.value()).toBe(10);
    expect(kingOfHearts.value()).toBe(10);
    expect(queenOfSpades.value()).toBe(10);
  });

  it('can be flipped over', () => {
    expect.assertions(2);
    const card = new PlayingCard(Suit.Clubs, 5);
    expect(card.faceUp).toBe(true);
    card.setFaceUp(false);
    expect(card.faceUp).toBe(false);
  });
});
