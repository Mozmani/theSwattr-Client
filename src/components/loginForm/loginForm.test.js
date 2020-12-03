import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from './loginForm';

describe('LoginForm component: Unit Tests', () => {
  const mockFn = jest.fn();
  const props = { onLoginSuccess: mockFn };

  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <LoginForm {...props} />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a form without crashing', () => {
    expect(component).toHaveLength(1);
    expect(component.find('form')).toHaveLength(1);
  });

  it('renders username and password labels and inputs', () => {
    const userLabel = component.find('.user-name-login-label'),
      userInput = component.find('.user-name-login-input'),
      passLabel = component.find('.password-login-label'),
      passInput = component.find('.password-login-input');

    expect(userLabel).toHaveLength(1);
    expect(userInput).toHaveLength(1);
    expect(passLabel).toHaveLength(1);
    expect(passInput).toHaveLength(1);
  });

  xit('invokes handleSubmit and onLoginSuccess', async () => {
    component
      .find('.user-name-login-input')
      .simulate('change', { value: 'admin' });

    component
      .find('.password-login-input')
      .simulate('change', { value: 'admin' });

    component.find('.LoginForm').simulate('submit');
  });
});
