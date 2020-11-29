import React from 'react';
import { shallow } from 'enzyme';

import DashboardRoute from './dashboardRoute';

describe.skip('DashboardRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<DashboardRoute />);
  });
});
