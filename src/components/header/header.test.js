import React from 'react';
import { shallow } from 'enzyme';

import Header from './header';

describe.skip('Header component:', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });
});
