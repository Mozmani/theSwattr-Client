import React from 'react';
import { shallow } from 'enzyme';

import RegisterRoute from './registerRoute';

describe.skip('RegisterRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<RegisterRoute />);
  });
});
