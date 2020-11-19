import React from 'react';
import { shallow } from 'enzyme';

import FiltersContainer from './filtersContainer';

describe.skip('FiltersContainer component:', () => {
  it('renders without crashing', () => {
    shallow(<FiltersContainer />);
  });
});
