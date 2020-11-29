import React from 'react';
import { shallow } from 'enzyme';

import EditBugRoute from './editBugRoute';

describe.skip('EditBugRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<EditBugRoute />);
  });
});
