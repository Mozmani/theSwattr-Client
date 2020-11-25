import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './loginForm';

describe('LoginForm component:', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  });
});
