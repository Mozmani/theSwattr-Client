import React from 'react';
import { shallow } from 'enzyme';

import { BugsProvider, CommentsProvider } from 'src/context';
import MainContainer from './mainContainer';

const WrappedMainContainer = () => (
  <BugsProvider>
    <CommentsProvider>
      <MainContainer />
    </CommentsProvider>
  </BugsProvider>
);

describe.skip('Header component:', () => {
  it('renders without crashing', () => {
    shallow(<WrappedMainContainer />);
  });
});
