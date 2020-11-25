import React from 'react';
import { shallow } from 'enzyme';

import { UserProvider, BugsProvider } from 'src/context';
import BugsContainer from './bugsContainer';

describe('BugsContainer component:', () => {
  it('renders without crashing', () => {
    shallow(
      <UserProvider>
        <BugsProvider>
          <BugsContainer />
        </BugsProvider>
      </UserProvider>,
    );
  });
});
