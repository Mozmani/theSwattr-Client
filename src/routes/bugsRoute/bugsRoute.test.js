import React from 'react';
import { shallow } from 'enzyme';

import BugsRoute from './bugsRoute';

describe.skip('BugsRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<BugsRoute />);
  });
});
