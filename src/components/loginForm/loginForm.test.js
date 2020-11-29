import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './loginForm';

describe.skip('LoginForm component: Unit Tests', () => {
  const mockFn = jest.fn();
  const props = { onLoginSuccess: mockFn };

  let component;
  beforeEach(() => {
    component = shallow(<LoginForm {...props} />);
  });

  it('renders a form without crashing', () => {
    expect(component).toHaveLength(1);
    expect(component.find('form')).toHaveLength(1);
  });

  it('renders username and password labels and inputs', () => {
    const userLabel = component.find('.user_name-login-label'),
      userInput = component.find('.user_name-login-input'),
      passLabel = component.find('.user_name-login-label'),
      passInput = component.find('.user_name-login-input');

    expect(userLabel).toHaveLength(1);
    expect(userInput).toHaveLength(1);
    expect(passLabel).toHaveLength(1);
    expect(passInput).toHaveLength(1);
  });
});
