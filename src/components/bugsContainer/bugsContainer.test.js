import React from 'react';
import { shallow } from 'enzyme';

import BugsContainer from './bugsContainer';

describe.skip('BugsContainer component:', () => {
  it('renders without crashing', () => {
    shallow(<BugsContainer />);
  });
});
