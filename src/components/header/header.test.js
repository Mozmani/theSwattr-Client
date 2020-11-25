import React from 'react';
import { shallow } from 'enzyme';

import { UserProvider } from 'src/context';
import Header from './header';

describe('Header component:', () => {
  it('renders without crashing', () => {
    shallow(
      <UserProvider>
        <Header />
      </UserProvider>,
    );
  });
});
