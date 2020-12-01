import React from 'react';
import { shallow } from 'enzyme';

import CompletedBugs from './completedBugs';

describe.skip('CommentsPage component:', () => {
  it('renders without crashing', () => {
    shallow(<CompletedBugs />);
  });
});
