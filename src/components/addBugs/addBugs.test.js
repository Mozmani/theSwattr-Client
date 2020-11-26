import React from 'react';
import { shallow } from 'enzyme';

import AddBugs from './addBugs';

describe('AddBugs component:', () => {
  it('renders without crashing', () => {
    shallow(<AddBugs />);
  });
});
