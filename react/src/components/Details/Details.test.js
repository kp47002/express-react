import React from 'react';
import { shallow } from 'enzyme';
import Details from './Details';

describe('<Details />', () => {
  test('renders', () => {
    const wrapper = shallow(<Details />);
    expect(wrapper).toMatchSnapshot();
  });
});
