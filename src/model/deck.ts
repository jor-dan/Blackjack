import PlayingCard, { Suit } from './playingcard';

class Deck {
  static readonly DECK_SIZE: number = 52;

  private deck: PlayingCard[];

  constructor() {
    this.deck = [];
    for (let rank = 1; rank <= Deck.DECK_SIZE / 4; rank++) {
      this.deck.push(new PlayingCard(Suit.Clubs, rank));
      this.deck.push(new PlayingCard(Suit.Diamonds, rank));
      this.deck.push(new PlayingCard(Suit.Hearts, rank));
      this.deck.push(new PlayingCard(Suit.Spades, rank));
    }
    this.shuffle();
  }

  private shuffle() {
    for (let i = 0; i < this.deck.length; i++) {
      const swap = Math.floor(Math.random() * this.deck.length);
      [this.deck[i], this.deck[swap]] = [this.deck[swap], this.deck[i]];
    }
  }

  /** Refills and shuffles deck under 25% full */
  public refill() {
    if (this.deck.length < Deck.DECK_SIZE * 0.25) this.deck = (new Deck()).deck;
  }

  public drawCard(faceUp = true): PlayingCard | undefined {
    const card = this.deck.pop();
    if (card !== undefined) card.setFaceUp(faceUp);
    return card;
  }
}

export default Deck;
