import React from 'react';
import { shallow } from 'enzyme';
import Controls from '../../src/components/Controls';

describe('<Controls />', () => {
  it('should have hit and stand buttons', () => {
    expect.assertions(3);
    const mock = jest.fn();
    const enabled = { hit: true, stand: true };
    const wrapper = shallow(<Controls hit={mock} stand={mock} enabled={enabled} />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => {
      expect(button.text()).toStrictEqual(expect.stringMatching(/(Hit|Stand)/));
    });
  });

  it('should call functions when buttons are clicked', () => {
    expect.assertions(2);
    const hit = jest.fn();
    const stand = jest.fn();
    const enabled = { hit: true, stand: true };
    const wrapper = shallow(<Controls hit={hit} stand={stand} enabled={enabled} />);
    wrapper.find('#hit').simulate('click');
    wrapper.find('#stand').simulate('click');
    expect(hit).toHaveBeenCalledTimes(1);
    expect(stand).toHaveBeenCalledTimes(1);
  });

  it('should enable buttons according to props', () => {
    expect.assertions(3);
    const mock = jest.fn();
    const enabled = { hit: true, stand: true };
    const wrapper = shallow(<Controls hit={mock} stand={mock} enabled={enabled} />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(false));
  });

  it('should disable buttons according to props', () => {
    expect.assertions(3);
    const mock = jest.fn();
    const enabled = { hit: false, stand: false };
    const wrapper = shallow(<Controls hit={mock} stand={mock} enabled={enabled} />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(true));
  });
});
