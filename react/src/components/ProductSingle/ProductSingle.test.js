import React from 'react';
import { shallow } from 'enzyme';
import ProductSingle from './ProductSingle';

describe('<ProductSingle />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProductSingle />);
    expect(wrapper).toMatchSnapshot();
  });
});
