import React from 'react';
import { shallow } from 'enzyme';

import { UserProvider } from 'src/context';
import Header from './header';

const WrappedHeader = () => (
  <UserProvider>
    <Header />
  </UserProvider>
);

describe.skip('Header component:', () => {
  it('renders without crashing', () => {
    shallow(<WrappedHeader />);
  });
});
