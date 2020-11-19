import React from 'react';
import { shallow } from 'enzyme';

import RegistrationForm from './registrationForm';

describe.skip('RegistrationForm component:', () => {
  it('renders without crashing', () => {
    shallow(<RegistrationForm />);
  });
});
