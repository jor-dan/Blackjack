import React from 'react';
import { shallow } from 'enzyme';
import Hand from '../../src/components/Hand';
import Card from '../../src/components/Card';
import PlayingCard, { Suit, Rank } from '../../src/model/playingcard';

describe('<Hand />', () => {
  const cards = [new PlayingCard(Suit.Clubs, Rank.Ace), new PlayingCard(Suit.Diamonds, Rank.Jack)];
  const title = 'Hand';
  const wrapper = shallow(<Hand hand={cards} title={title} />);

  it('should render a title', () => {
    expect.assertions(1);
    expect(wrapper.text()).toStrictEqual(expect.stringContaining(title));
  });

  it('should render cards', () => {
    expect.assertions(1);
    expect(wrapper.find(Card)).toHaveLength(cards.length);
  });

  it('should have correct props for cards', () => {
    expect.assertions(2);
    wrapper.find(Card).forEach((node, index) => {
      expect(node.props()).toMatchObject({
        card: cards[index],
      });
    });
  });
});
