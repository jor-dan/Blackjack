import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../src/components/App';
import Hand from '../../src/components/Hand';
import Controls from '../../src/components/Controls';
import PlayingCard from '../../src/model/playingcard';

describe('<App />', () => {
  it('should render two hands', () => {
    expect.assertions(1);
    const wrapper = shallow(<App />);
    expect(wrapper.find(Hand)).toHaveLength(2);
  });

  it('should have two cards in each hand', () => {
    expect.assertions(2);
    const wrapper = mount(<App />);
    wrapper.find(Hand).forEach((node) => {
      expect(node.prop('hand')).toStrictEqual([expect.any(PlayingCard), expect.any(PlayingCard)]);
    });
  });

  it('should have proper titles for both hands', () => {
    expect.assertions(2);
    const wrapper = shallow(<App />);
    wrapper.find(Hand).forEach((node) => {
      expect(node.prop('title')).toStrictEqual(expect.stringMatching(/^(Deal|Play)er/));
    });
  });

  it('should have enabled buttons', () => {
    expect.assertions(2);
    const wrapper = mount(<App />);
    const controls = wrapper.find(Controls);
    expect(controls.find('button')).toHaveLength(2);
    expect(controls.props()).toStrictEqual({
      hit: expect.any(Function),
      stand: expect.any(Function),
      enabled: { hit: true, stand: true },
    });
  });

  it('should give user 1 card when hit is clicked', () => {
    expect.assertions(2);
    const wrapper = mount(<App />);
    wrapper.find('#hit').simulate('click');
    const hands = wrapper.find(Hand);
    // Dealer still has 2 cards.
    expect(hands.at(0).prop('hand')).toHaveLength(2);
    // Player has 1 additonal card.
    expect(hands.at(1).prop('hand')).toHaveLength(3);
  });

  it('should not disable buttons when hit is clicked', () => {
    expect.assertions(1);
    const wrapper = mount(<App />);
    wrapper.find('#hit').simulate('click');
    expect(wrapper.find(Controls).props()).toStrictEqual({
      hit: expect.any(Function),
      stand: expect.any(Function),
      enabled: { hit: true, stand: true },
    });
  });

  it('should disable buttons when stand is clicked', () => {
    expect.assertions(1);
    const wrapper = mount(<App />);
    wrapper.find('#stand').simulate('click');
    expect(wrapper.find(Controls).props()).toStrictEqual({
      hit: expect.any(Function),
      stand: expect.any(Function),
      enabled: { hit: false, stand: false },
    });
  });
});
