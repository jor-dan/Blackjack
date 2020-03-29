import PlayingCard from './playingcard';
import Hand from './hand';
import Deck from './deck';

export const enum Outcome {
  win,
  loss,
  tie,
}

export const enum User {
  dealer,
  player,
}

class Blackjack {
  static readonly MAX_SCORE = 21;

  static readonly DEALER_MIN_SCORE = 17;

  private deck: Deck;

  private turn_: User;

  constructor() {
    this.deck = new Deck();
  }

  /** Returns the user whose turn it is or undefined if turn hasn't been set */
  public turn = (): User | undefined => this.turn_;

  public setTurn(turn: User) {
    this.turn_ = turn;
  }

  public initialHand(user: User) {
    return [this.deck.drawCard(), this.deck.drawCard(user !== User.dealer)];
  }

  public drawCard = () => this.deck.drawCard();

  public reset() {
    this.turn_ = undefined;
    this.deck.refill();
  }

  /**
   * Returns the outcome of the game from the player's perspective
   *
   * @param playerHand the player's hand
   * @param dealerHand the dealer's hand
   * @returns whether the player won/lost/tied, or null if the outcome can't be determined yet.
   */
  public static outcome(playerHand: PlayingCard[], dealerHand: PlayingCard[]): Outcome | null {
    const player = Blackjack.score(playerHand);
    const dealer = Blackjack.score(dealerHand);
    if (dealer < Blackjack.DEALER_MIN_SCORE) {
      return player > Blackjack.MAX_SCORE ? Outcome.loss : null;
    }
    if ((dealer > Blackjack.MAX_SCORE || player > dealer) && player <= Blackjack.MAX_SCORE) {
      return Outcome.win;
    }
    if (player > Blackjack.MAX_SCORE || dealer > player) {
      return Outcome.loss;
    }
    return Outcome.tie;
  }

  public static score = (hand: readonly PlayingCard[]): number => Hand.score(hand);

  public static reveal = (hand: PlayingCard[]) => Hand.reveal(hand);

  public static busts(hand: readonly PlayingCard[]): boolean {
    return Hand.score(hand) > Blackjack.MAX_SCORE;
  }

  public static dealerShouldDrawCard(dealerHand: readonly PlayingCard[]): boolean {
    return Hand.score(dealerHand) < Blackjack.DEALER_MIN_SCORE;
  }
}

export default Blackjack;
