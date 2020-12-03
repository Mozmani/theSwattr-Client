import React from 'react';
import { mount } from 'enzyme';

import { UserProvider, CommentsProvider } from 'src/context';
import CommentsPage from './commentsPage';

describe('CommentsPage component: Unit Tests', () => {
  const mockFn = jest.fn();
  const props = {
    match: { params: { bugId: 1 } },
    onLoginSuccess: mockFn,
  };

  let component;
  beforeEach(() => {
    component = mount(
      <UserProvider>
        <CommentsProvider>
          <CommentsPage {...props} />
        </CommentsProvider>
      </UserProvider>,
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
      component.find('.new-comment-label'),
      component.find('.new-comment-input'),
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
