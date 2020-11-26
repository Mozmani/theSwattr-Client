import React from 'react';
import { shallow } from 'enzyme';

import RegistrationForm from './registrationForm';

describe('RegistrationForm component:', () => {
  it('renders without crashing', () => {
    shallow(<RegistrationForm />);
  });
});
