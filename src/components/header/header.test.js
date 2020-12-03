import React from 'react';
import { shallow } from 'enzyme';

import { UserProvider } from 'src/context';
import Header from './header';

describe('Header component:', () => {
  const ProvidedComponent = () => (
    <UserProvider>
      <Header />
    </UserProvider>
  );

  let component;
  beforeEach(() => {
    component = shallow(<ProvidedComponent />);
  });

  it('renders without crashing', () => {
    expect(component.find('.dash-header')).toBeTruthy();
  });
});
