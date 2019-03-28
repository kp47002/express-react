import React from 'react';
import { shallow } from 'enzyme';
import Sell from './Sell';

describe('<Sell />', () => {
  test('renders', () => {
    const wrapper = shallow(<Sell />);
    expect(wrapper).toMatchSnapshot();
  });
});
