import React, { useReducer } from 'react';

const initialState = {
  firstName: {
    value: '',
    error: null,
  },
  lastName: {
    value: '',
    error: null,
  },
  email: {
    value: '',
    error: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: {
          value: action.value,
          error: validateField(action.field, action.value),
        },
      };
    default:
      return state;
  }
}

function validateField(field, value) {
  switch (field) {
    case 'firstName':
    case 'lastName':
      if (value.length < 2) {
        return 'Field must have at least 2 characters';
      }
      break;
    case 'email':
      if (!/\S+@\S+\.\S+/.test(value)) {
        return 'Invalid email address';
      }
      break;
    default:
      return null;
  }
}

function FormComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={state.firstName.value}
          onChange={handleInputChange}
        />
        {state.firstName.error !== null && (
          <p className="error">{state.firstName.error}</p>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={state.lastName.value}
          onChange={handleInputChange}
        />
        {state.lastName.error !== null && (
          <p className="error">{state.lastName.error}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email.value}
          onChange={handleInputChange}
        />
        {state.email.error !== null && (
          <p className="error">{state.email.error}</p>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
