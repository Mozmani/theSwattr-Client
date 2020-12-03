import React from 'react';
import { shallow } from 'enzyme';

import { UserProvider, BugsProvider } from 'src/context';
import BugsContainer from './bugsContainer';

describe('BugsContainer component:', () => {
  const ProvidedComponent = () => (
    <UserProvider>
      <BugsProvider>
        <BugsContainer />
      </BugsProvider>
    </UserProvider>
  );

  let component;
  beforeEach(() => {
    component = shallow(<ProvidedComponent />);
  });

  it('renders without crashing', () => {
    expect(component.find('.main-container')).toBeTruthy();
  });
});
