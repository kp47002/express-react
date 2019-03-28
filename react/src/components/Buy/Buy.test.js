import React from 'react';
import { shallow } from 'enzyme';
import Buy from './Buy';

describe('<Buy />', () => {
  test('renders', () => {
    const wrapper = shallow(<Buy />);
    expect(wrapper).toMatchSnapshot();
  });
});
