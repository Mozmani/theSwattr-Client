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

  let formElements;
  beforeEach(() => {
    formElements = [
      component.find('.user-name-login-label'),
      component.find('.user-name-login-input'),
      component.find('.password-login-label'),
      component.find('.password-login-input'),
    ];
  });

  it('renders all labels and inputs', () => {
    formElements.forEach((el) => expect(el).toHaveLength(1));
  });

  it.skip('invokes handleSubmit and onLoginSuccess', async () => {
    await formElements.forEach((el) => {
      if (!el.text()) {
        el.simulate('change', { value: 'admin' });
      }
    });

    component.find('.login-form').simulate('submit');
  });
});
