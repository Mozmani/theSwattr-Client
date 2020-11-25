import React from 'react';
import { shallow } from 'enzyme';

import LoginRoute from './loginRoute';

describe('LoginRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<LoginRoute />);
  });
});
