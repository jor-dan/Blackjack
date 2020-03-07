import PlayingCard from './playingcard';

abstract class Hand {
  public static score(hand: PlayingCard[]): number {
    let score = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (!card.faceUp()) return;
      const value = card.value();
      if (value === 1) {
        aces += 1;
      } else {
        score += value;
      }
    });

    while (aces > 0) {
      if (score + 11 === 21) {
        score += aces > 1 ? 1 : 11;
      } else {
        score += score + 11 > 21 ? 1 : 11;
      }
      aces -= 1;
    }

    return score;
  }

  public static reveal = (hand: PlayingCard[]) => hand.forEach((card) => card.setFaceUp(true));
}

export default Hand;
