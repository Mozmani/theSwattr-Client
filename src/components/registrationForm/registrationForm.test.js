import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import RegistrationForm from './registrationForm';

describe('RegistrationForm component: Unit Tests', () => {
  const mockFn = jest.fn();
  const props = { onRegistrationSuccess: mockFn };

  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <RegistrationForm {...props} />
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
      component.find('.first-name-reg-label'),
      component.find('.first-name-reg-input'),
      component.find('.last-name-reg-label'),
      component.find('.last-name-reg-input'),
      component.find('.email-reg-label'),
      component.find('.email-reg-input'),
      component.find('.user-name-reg-label'),
      component.find('.user-name-reg-input'),
      component.find('.password-reg-label'),
      component.find('.password-reg-input'),
    ];
  });

  it('renders all labels and inputs', () => {
    formElements.forEach((el) => expect(el).toHaveLength(1));
  });

  it.skip('invokes handleSubmit and onRegistrationSuccess', async () => {
    await formElements.forEach((el) => {
      if (!el.text()) {
        if (el.prop('id') === 'email') {
          el.simulate('change', { value: 'Test123!@gmail.com' });
        } else el.simulate('change', { value: 'Test123!' });
      }
    });

    component.find('.register-form').simulate('submit');
  });
});
