import React from 'react';
import { shallow } from 'enzyme';

import CommentsContainer from './commentsContainer';

describe.skip('CommentsContainer component:', () => {
  it('renders without crashing', () => {
    shallow(<CommentsContainer />);
  });
});
