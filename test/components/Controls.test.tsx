import React from 'react';
import { shallow } from 'enzyme';
import Controls from '../../src/components/Controls';

describe('<Controls />', () => {
  const mocks = { hit: jest.fn(), stand: jest.fn(), reset: jest.fn() };
  const enabled = { hit: true, stand: true, reset: true };

  beforeEach(() => {
    jest.resetAllMocks();
    Object.keys(enabled).forEach((key) => {
      enabled[key] = true;
    });
  });

  it('should have hit, stand, and reset buttons', () => {
    expect.assertions(4);
    const wrapper = shallow(<Controls functions={mocks} enabled={enabled} />);
    mocks.hit.mockName('lol');
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
    const regExp = /^(Hit|Stand|Reset)$/;
    buttons.forEach((button) => {
      expect(button.text()).toStrictEqual(expect.stringMatching(regExp));
    });
  });

  it('should call functions when buttons are clicked', () => {
    expect.assertions(3);
    const wrapper = shallow(<Controls functions={mocks} enabled={enabled} />);
    ['#hit', '#stand', '#reset'].forEach((id) => wrapper.find(id).simulate('click'));
    Object.values(mocks).forEach((mock) => expect(mock).toHaveBeenCalledTimes(1));
  });

  it('should enable buttons according to props', () => {
    expect.assertions(4);
    const wrapper = shallow(<Controls functions={mocks} enabled={enabled} />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(false));
  });

  it('should disable buttons according to props', () => {
    expect.assertions(4);
    const disabled = { hit: false, stand: false, reset: false };
    const wrapper = shallow(<Controls functions={mocks} enabled={disabled} />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(true));
  });
});
