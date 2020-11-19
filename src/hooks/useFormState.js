import React from 'react';

const useFormState = (initialValues) => {
  const [formFields, setFormFields] = React.useState(initialValues);

  const handleOnChange = (key) => (ev) => {
    const { value } = ev.target;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  return { formFields, setFormFields, handleOnChange };
};

export default useFormState;
