import Deck from '../../src/model/deck';

describe('Deck', () => {
  it('has 52 cards', () => {
    expect.assertions(54);
    expect(Deck.DECK_SIZE).toBe(52);
    const deck = new Deck();
    for (let i = 0; i < Deck.DECK_SIZE; i++) {
      expect(deck.drawCard()).toBeDefined();
    }
    expect(deck.drawCard()).toBeUndefined();
  });

  it('deals cards face up or face down', () => {
    expect.assertions(3);
    const deck = new Deck();
    expect(deck.drawCard().faceUp()).toBe(true);
    expect(deck.drawCard(true).faceUp()).toBe(true);
    expect(deck.drawCard(false).faceUp()).toBe(false);
  });
});
