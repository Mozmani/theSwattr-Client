import React from 'react';
import { shallow } from 'enzyme';

import ToggleDev from './toggleDev';

describe.skip('RegistrationForm component:', () => {
  it('renders without crashing', () => {
    shallow(<ToggleDev />);
  });
});
