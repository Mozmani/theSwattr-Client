import React from 'react';
import { shallow } from 'enzyme';

import { CommentsProvider } from 'src/context';
import CommentsContainer from './commentsContainer';

const WrappedCommentsContainer = () => (
  <CommentsProvider>
    <CommentsContainer />
  </CommentsProvider>
);

describe('CommentsContainer component:', () => {
  it('renders without crashing', () => {
    shallow(<WrappedCommentsContainer />);
  });
});
