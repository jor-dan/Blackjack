class PlayingCard {
  private _suit: Suit;

  private _rank: Rank;

  private _faceUp: boolean;

  constructor(suit: Suit, rank: Rank, faceUp = true) {
    this._suit = suit;
    this._rank = rank;
    this._faceUp = faceUp;
  }

  public suit = (): Suit => this._suit;

  public rank = (): Rank => this._rank;

  public value = (): number => Math.min(this._rank, 10);

  public faceUp = (): boolean => this._faceUp;

  public setFaceUp(faceUp: boolean) {
    this._faceUp = faceUp;
  }

  public suitName(): string {
    switch (this._suit) {
      case '♣': return 'Clubs';
      case '♦': return 'Diamonds';
      case '♥': return 'Hearts';
      case '♠': return 'Spades';
    }
  }
}

export const enum Suit {
  Clubs = '♣',
  Diamonds = '♦',
  Hearts = '♥',
  Spades = '♠',
}

export const enum Rank {
  Ace = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

export default PlayingCard;
