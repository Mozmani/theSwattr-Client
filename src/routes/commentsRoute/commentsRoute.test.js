import React from 'react';
import { shallow } from 'enzyme';

import CommentsRoute from './commentsRoute';

describe.skip('CommentsRoute component:', () => {
  it('renders without crashing', () => {
    shallow(<CommentsRoute />);
  });
});
