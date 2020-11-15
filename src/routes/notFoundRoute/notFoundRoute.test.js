import React from 'react';
import { shallow } from 'enzyme';

import NotFoundRoute from './notFoundRoute';

describe.skip('NotFoundRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<NotFoundRoute />);
  });
});
