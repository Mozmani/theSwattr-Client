import React from 'react';
import { mount } from 'enzyme';

import { BugsProvider, UserProvider } from 'src/context';
import AddBugs from './addBugs';

describe('AddBugs component:', () => {
  const ProvidedComponent = () => (
    <UserProvider>
      <BugsProvider>
        <AddBugs />
      </BugsProvider>
    </UserProvider>
  );

  let component;
  beforeEach(() => {
    component = mount(<ProvidedComponent />);
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
      component.find('.bug-name-add-label'),
      component.find('.bug-name-add-input'),
      component.find('.description-add-label'),
      component.find('.description-add-input'),
    ];
  });

  it('renders all labels and inputs', () => {
    formElements.forEach((el) => expect(el).toHaveLength(1));
  });

  it.skip('invokes handleSubmit', async () => {
    await formElements.forEach((el) => {
      if (!el.text()) {
        el.simulate('change', { value: 'Test123!' });
      }
    });

    component.find('.register-form').simulate('submit');
  });
});
