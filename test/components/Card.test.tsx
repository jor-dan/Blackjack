import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../src/components/Card';
import PlayingCard, { Suit, Rank } from '../../src/model/playingcard';

describe('<Card />', () => {
  it('should render a face up card', () => {
    expect.assertions(2);
    const card = new PlayingCard(Suit.Clubs, Rank.Ace);
    const wrapper = shallow(<Card card={card} />);
    expect(wrapper.hasClass(`card-${card.suitName()}`)).toBe(true);
    expect(wrapper.contains(<p className="symbol">{card.suit}</p>)).toBe(true);
  });

  it('should render a face down card', () => {
    expect.assertions(3);
    const card = new PlayingCard(Suit.Clubs, Rank.Ace);
    card.setFaceUp(false);
    const wrapper = shallow(<Card card={card} />);
    expect(wrapper.hasClass('card')).toBe(true);
    expect(wrapper.hasClass(`card-${card.suitName()}`)).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
  });
});
