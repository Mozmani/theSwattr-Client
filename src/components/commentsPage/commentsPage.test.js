import React from 'react';
import { shallow } from 'enzyme';

import CommentsPage from './commentsPage';

describe('CommentsPage component:', () => {
  it('renders without crashing', () => {
    shallow(<CommentsPage />);
  });
});
