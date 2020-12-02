import React from 'react';
import { shallow } from 'enzyme';

import { BugsProvider, CommentsProvider } from 'src/context';
import AddBugs from './addBugs';

describe.skip('AddBugs component:', () => {
  const ProvidedComponent = () => (
    <BugsProvider>
      <CommentsProvider>
        <AddBugs />
      </CommentsProvider>
    </BugsProvider>
  );

  let component;
  beforeEach(() => {
    component = shallow(<ProvidedComponent />);
  });

  it('renders without crashing', () => {
    // expect(component)
    console.log(component.props());
  });
});
