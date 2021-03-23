import React, { useReducer } from 'react';

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const useInputs = (initialForm) => {
  const [state, dispatch] = useReducer(reducer, initialForm);
  return [state, dispatch];
};

export default useInputs;
