class PlayingCard {
  private readonly _suit: Suit;

  private readonly _rank: Rank;

  private _faceUp: boolean;

  constructor(suit: Suit, rank: Rank, faceUp = true) {
    this._suit = suit;
    this._rank = rank;
    this._faceUp = faceUp;
  }

  public get suit(): Suit {
    return this._suit;
  }

  public get rank(): string {
    switch (this._rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return this._rank.toString();
    }
  }

  public value = (): number => Math.min(this._rank, 10);

  public get faceUp(): boolean {
    return this._faceUp;
  }

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
