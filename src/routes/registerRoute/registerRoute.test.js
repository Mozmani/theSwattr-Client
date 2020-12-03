import React from 'react';
import { shallow } from 'enzyme';

import RegisterRoute from './registerRoute';

describe('RegisterRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<RegisterRoute />);
  });
});
