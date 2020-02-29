import PlayingCard, { Suit } from './playingcard';

class Deck {
  static readonly DECK_SIZE: number = 52;

  private _deck: PlayingCard[];

  constructor() {
    this._deck = [];
    for (let rank = 1; rank <= Deck.DECK_SIZE / 4; rank++) {
      this._deck.push(new PlayingCard(Suit.Clubs, rank));
      this._deck.push(new PlayingCard(Suit.Diamonds, rank));
      this._deck.push(new PlayingCard(Suit.Hearts, rank));
      this._deck.push(new PlayingCard(Suit.Spades, rank));
    }
    this.shuffle();
  }

  private shuffle() {
    for (let i = 0; i < this._deck.length; i++) {
      const swap = Math.floor(Math.random() * this._deck.length);
      [this._deck[i], this._deck[swap]] = [this._deck[swap], this._deck[i]];
    }
  }

  public drawCard(faceUp = true): PlayingCard {
    const card = this._deck.pop();
    card.setFaceUp(faceUp);
    return card;
  }
}

export default Deck;
