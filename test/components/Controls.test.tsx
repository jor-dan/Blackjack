import React from 'react';
import { shallow } from 'enzyme';
import Controls from '../../src/components/Controls';

describe('<Controls />', () => {
  const defaultMessage = 'Default Message';
  const mocks = { hit: jest.fn(), stand: jest.fn(), reset: jest.fn() };

  const controls = (enabled = { hit: true, stand: true, reset: true }) => (
    <Controls message={defaultMessage} functions={mocks} enabled={enabled} />
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should have a message', () => {
    expect.assertions(1);
    const wrapper = shallow(controls());
    expect(wrapper.text()).toStrictEqual(expect.stringContaining(defaultMessage));
  });

  it('should have hit, stand, and reset buttons', () => {
    expect.assertions(4);
    const wrapper = shallow(controls());
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
    const wrapper = shallow(controls());
    ['#hit', '#stand', '#reset'].forEach((id) => wrapper.find(id).simulate('click'));
    Object.values(mocks).forEach((mock) => expect(mock).toHaveBeenCalledTimes(1));
  });

  it('should enable buttons according to props', () => {
    expect.assertions(4);
    const wrapper = shallow(controls());
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(false));
  });

  it('should disable buttons according to props', () => {
    expect.assertions(4);
    const wrapper = shallow(controls({ hit: false, stand: false, reset: false }));
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => expect(button.prop('disabled')).toBe(true));
  });
});
