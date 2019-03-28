import React from 'react';
import { shallow } from 'enzyme';
import Add from './Add';

describe('<Add />', () => {
  test('renders', () => {
    const wrapper = shallow(<Add />);
    expect(wrapper).toMatchSnapshot();
  });
});
