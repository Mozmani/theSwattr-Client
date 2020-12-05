import React from 'react';

//custom forms hook
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
// generate login fields
export const LoginFields = {
  _fields: ['user_name', 'password'],

  _formAttributesibutes: {
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
//generate input fields
  getInputFields(formFields, handleOnChange) {
    return LoginFields._fields.map((field) => {
      const attrs = LoginFields._formAttributesibutes[field];

      return render(formFields, handleOnChange, field, attrs);
    });
  },
};

//generates registration fields
export const RegisterFields = {
  _fields: [
    'first_name',
    'last_name',
    'email',
    'user_name',
    'password',
  ],

  _formAttributesibutes: {
    first_name: {
      displayText: 'Enter First Name',
      inputType: 'text',
      labelClass: 'first-name-reg-label',
      inputClass: 'first-name-reg-input',
    },

    last_name: {
      displayText: 'Enter Last Name',
      inputType: 'text',
      labelClass: 'last-name-reg-label',
      inputClass: 'last-name-reg-input',
    },

    email: {
      displayText: 'Enter E-mail',
      inputType: 'text',
      labelClass: 'email-reg-label',
      inputClass: 'email-reg-input',
    },

    user_name: {
      displayText: 'Choose a Username',
      inputType: 'text',
      labelClass: 'user-name-reg-label',
      inputClass: 'user-name-reg-input',
    },

    password: {
      displayText: 'Choose a Password',
      inputType: 'password',
      labelClass: 'password-reg-label',
      inputClass: 'password-reg-input',
    },
  },

  //generates input fields
  getInputFields(formFields, handleOnChange) {
    return RegisterFields._fields.map((field) => {
      const attrs = RegisterFields._formAttributesibutes[field];

      return render(formFields, handleOnChange, field, attrs);
    });
  },
};

// generate edit bug fields
export const EditBugFields = {
  _selects: ['severity', 'status', 'allApps'],

  _textAreas: ['description', 'completedNotes'],

  _formAttributesibutes: {
    severity: {
      displayText: 'Severity:',
      labelClass: 'severity-edit-label',
      inputClass: 'severity-edit-input',
    },

    status: {
      displayText: 'Status:',
      labelClass: 'status-edit-label',
      inputClass: 'status-edit-input',
    },

    allApps: {
      displayText: 'App Name:',
      labelClass: 'all-apps-edit-label',
      inputClass: 'all-apps-edit-input',
    },

    description: {
      displayText: 'Description:',
      labelClass: 'description-edit-label',
      inputClass: 'description-edit-input',
    },

    completedNotes: {
      displayText: 'Completed Notes',
      labelClass: 'completed-notes-edit-label',
      inputClass: 'completed-notes-edit-input',
    },
  },

  //generates input fields
  getInputFields(selectData, bug, formFields, handleOnChange) {
    const renderSelects = EditBugFields._selects.map((field) => {
      const datas = selectData[field];
      const attrs = EditBugFields._formAttributesibutes[field];

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

    // renders textarea's
    const renderTextAreas = EditBugFields._textAreas.map((field) => {
      const attrs = EditBugFields._formAttributesibutes[field];

      //render placeholder text for edit bugs 
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

//renders add bug form
export const AddBugFields = {
  _fields: ['bug_name', 'description'],

  _formAttributesibutes: {
    bug_name: {
      displayText: 'Bug Name',
      inputType: 'text',
      labelClass: 'bug-name-add-label',
      inputClass: 'bug-name-add-input',
    },
    description: {
      displayText: 'Description',
      inputType: '',
      labelClass: 'description-add-label',
      inputClass: 'description-add-input',
    },
  },

  getInputFields(allApps, formFields, handleOnChange) {
    const inputFields = AddBugFields._fields.map((field) => {
      const attrs = AddBugFields._formAttributesibutes[field];

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
          {allApps?.map((app) => {
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

//renders add comment form
export const CommentFields = {
  getInputFields(formFields, handleOnChange) {
    return (
      <label htmlFor="newComment" className="new-comment-label">
        <textarea
          required
          id="newComment"
          value={formFields.comment}
          onChange={handleOnChange('comment')}
          className="new-comment-input"
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
