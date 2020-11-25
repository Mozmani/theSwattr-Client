import React from 'react';
import { shallow } from 'enzyme';

import { CommentsProvider } from 'src/context';
import CommentsContainer from './commentsContainer';

describe('CommentsContainer component:', () => {
  it('renders without crashing', () => {
    shallow(
      <CommentsProvider>
        <CommentsContainer />
      </CommentsProvider>,
    );
  });
});
