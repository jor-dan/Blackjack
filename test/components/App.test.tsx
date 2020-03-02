import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../src/components/App';
import Hand from '../../src/components/Hand';
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
});
