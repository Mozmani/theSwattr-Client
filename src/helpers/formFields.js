import React from 'react';

const render = (
  formFields,
  handleOnChange,
  field,
  { displayText, inputClass, inputType, labelClass },
  isTextArea = false,
) => {
  return (
    <label key={field} htmlFor={field} className={labelClass}>
      {displayText}
      {isTextArea ? (
        <textarea
          required
          id={field}
          value={formFields[field]}
          onChange={handleOnChange(field)}
          className={inputClass}
        />
      ) : (
        <input
          required
          id={field}
          type={inputType}
          value={formFields[field]}
          onChange={handleOnChange(field)}
          className={inputClass}
        />
      )}
    </label>
  );
};

export const LoginFields = {
  _fields: ['user_name', 'password'],

  __formAttributesibutes: {
    user_name: {
      displayText: 'Username',
      inputType: 'text',
      labelClass: 'user-name-login-label',
      inputClass: 'user-name-login-input',
    },

    password: {
      displayText: 'Password',
      inputType: 'password',
      labelClass: 'password-login-label',
      inputClass: 'password-login-input',
    },
  },

  getInputFields(formFields, handleOnChange) {
    return LoginFields._fields.map((field) => {
      const attrs = LoginFields.__formAttributesibutes[field];

      return render(formFields, handleOnChange, field, attrs);
    });
  },
};

export const RegisterFields = {
  _fields: [
    'first_name',
    'last_name',
    'email',
    'user_name',
    'password',
  ],

  __formAttributesibutes: {
    first_name: {
      displayText: 'Enter First Name',
      inputType: 'text',
      labelClass: 'first-name-register-label',
      inputClass: 'first-name-register-input',
    },

    last_name: {
      displayText: 'Enter Last Name',
      inputType: 'text',
      labelClass: 'last-name-register-label',
      inputClass: 'last-name-register-input',
    },

    email: {
      displayText: 'Enter E-mail',
      inputType: 'text',
      labelClass: 'email-register-label',
      inputClass: 'email-register-input',
    },

    user_name: {
      displayText: 'Choose a Username',
      inputType: 'text',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },

    password: {
      displayText: 'Choose a Password',
      inputType: 'password',
      labelClass: 'password-register-label',
      inputClass: 'password-register-input',
    },
  },

  getInputFields(formFields, handleOnChange) {
    return RegisterFields._fields.map((field) => {
      const attrs = RegisterFields.__formAttributesibutes[field];

      return render(formFields, handleOnChange, field, attrs);
    });
  },
};

export const EditBugFields = {
  _selects: ['severity', 'status', 'allApps'],

  _textAreas: ['description', 'completedNotes'],

  __formAttributesibutes: {
    severity: {
      displayText: 'Severity:',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },

    status: {
      displayText: 'Status:',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },

    allApps: {
      displayText: 'App Name:',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },

    description: {
      displayText: 'Description:',
      labelClass: 'user-name-register-label',
      inputClass: 'user-name-register-input',
    },

    completedNotes: {
      displayText: 'Completed Notes',
      labelClass: 'password-register-label',
      inputClass: 'password-register-input',
    },
  },

  getInputFields(selectData, bug, formFields, handleOnChange) {
    const renderSelects = EditBugFields._selects.map((field) => {
      const datas = selectData[field];
      const attrs = EditBugFields.__formAttributesibutes[field];

      return (
        <label
          key={field}
          htmlFor={field}
          className={attrs.labelClass}
        >
          {attrs.displayText}
          <select
            id={field}
            className={attrs.inputClass}
            value={formFields[field]}
            onChange={handleOnChange(field)}
          >
            {datas.map((data) =>
              field === 'allApps' ? (
                <option key={data.id} value={data.rawName}>
                  {data.formatName}
                </option>
              ) : (
                <option key={data} value={data}>
                  {data}
                </option>
              ),
            )}
          </select>
        </label>
      );
    });

    const renderTextAreas = EditBugFields._textAreas.map((field) => {
      const attrs = EditBugFields.__formAttributesibutes[field];

      const placeholder =
        field === 'description'
          ? bug.description
          : 'Only enter this if you are closing the bug!';

      return (
        <label
          key={field}
          htmlFor={field}
          className={attrs.labelClass}
        >
          {attrs.displayText}
          <textarea
            required={field === 'description'}
            id={field}
            placeholder={placeholder}
            value={formFields[field]}
            onChange={handleOnChange(field)}
            className={attrs.inputClass}
          />
        </label>
      );
    });

    return (
      <>
        {renderSelects}
        {renderTextAreas}
      </>
    );
  },
};

export const AddBugFields = {
  _fields: ['bug_name', 'description'],

  __formAttributesibutes: {
    bug_name: {
      displayText: 'Bug Name',
      inputType: 'text',
      labelClass: 'bug-name-add-bug-label',
      inputClass: 'bug-name-add-bug-input',
    },
    description: {
      displayText: 'Description',
      inputType: '',
      labelClass: 'description-add-bug-label',
      inputClass: 'description-add-bug-input',
    },
  },

  getInputFields(allApps, formFields, handleOnChange) {
    const inputFields = AddBugFields._fields.map((field) => {
      const attrs = AddBugFields.__formAttributesibutes[field];

      const isTextArea = field === 'description';

      return render(
        formFields,
        handleOnChange,
        field,
        attrs,
        isTextArea,
      );
    });

    const appSelect = (
      <label htmlFor="app" className="app-selector-label">
        Select Bugged App:
        <select
          id="app"
          value={formFields.app}
          onChange={handleOnChange('app')}
          className="app-selector"
        >
          {allApps.map((app) => {
            return (
              <option key={app.id} value={app.rawName}>
                {app.formatName}
              </option>
            );
          })}
        </select>
      </label>
    );

    return (
      <>
        {appSelect}
        {inputFields}
      </>
    );
  },
};

export const CommentFields = {
  getInputFields(formFields, handleOnChange) {
    return (
      <label htmlFor="newComment" className="new-comment-label">
        <textarea
          required
          id="newComment"
          value={formFields.comment}
          onChange={handleOnChange('comment')}
          className="comment-input"
        />
      </label>
    );
  },
};

export const ToggleDevFields = {
  getInputFields() {
    return (
      <label htmlFor="devSecret" className="dev-secret-label">
        Enter Dev Password
        <input
          type="password"
          id="devSecret"
          className="dev-secret-input"
        />
      </label>
    );
  },
};
