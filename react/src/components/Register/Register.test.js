import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

describe('<Register />', () => {
  test('renders', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
  });
});
