import React from 'react';
import { shallow } from 'enzyme';

import { BugsProvider, CommentsProvider } from 'src/context';
import AddBugs from './addBugs';

describe.skip('AddBugs component:', () => {
  const WrappedAddBugsContainer = () => (
    <BugsProvider>
      <CommentsProvider>
        <AddBugs />
      </CommentsProvider>
    </BugsProvider>
  );

  let component;
  beforeEach(() => {
    component = shallow(<WrappedAddBugsContainer />);
  });

  it('renders without crashing', () => {
    // expect(component)
    console.log(component.props());
  });
});
