import React from 'react';
import { shallow } from 'enzyme';

import { BugsProvider, CommentsProvider } from 'src/context';
import MainContainer from './mainContainer';

describe('Header component:', () => {
  const ProvidedComponent = () => (
    <BugsProvider>
      <CommentsProvider>
        <MainContainer />
      </CommentsProvider>
    </BugsProvider>
  );

  let component;
  beforeEach(() => {
    component = shallow(<ProvidedComponent />);
  });

  it('renders without crashing', () => {
    expect(component.find('dashboard-select-app-div')).toBeTruthy();
  });
});
