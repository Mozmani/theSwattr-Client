import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider, BugsProvider } from 'src/context';
import EditBugs from './editBugs';

describe.skip('EditBugs component: Unit Tests', () => {
  const props = {
    match: { params: { bugId: 1 } },
  };

  let component;
  beforeEach(() => {
    component = mount(
      <UserProvider>
        <BugsProvider>
          <BrowserRouter>
            <EditBugs {...props} />
          </BrowserRouter>
        </BugsProvider>
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
      component.find('.severity-edit-label'),
      component.find('.severity-edit-input'),
      component.find('.status-edit-label'),
      component.find('.status-edit-input'),
      component.find('.all-apps-edit-label'),
      component.find('.all-apps-edit-input'),
      component.find('.description-edit-label'),
      component.find('.description-edit-input'),
      component.find('.completed-notes-edit-label'),
      component.find('.completed-notes-edit-input'),
    ];
  });

  it('renders all labels and inputs', () => {
    console.log(component.find('form').html());
    formElements.forEach((el) => expect(el).toHaveLength(1));
  });

  it.skip('invokes handleSubmit', async () => {
    await formElements.forEach((el) => {
      el.simulate('change', { value: 'Test123!' });
    });

    component.find('.edit-bug-form').simulate('submit');
  });
});
