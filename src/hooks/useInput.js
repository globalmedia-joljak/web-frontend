import { useReducer } from 'react';

const reducer = (state, { name, value }) => {
  return {
    ...state,
    [name]: value,
  };
};
const useInput = (initialForm) => {
  const [state, dispatch] = useReducer(reducer, initialForm);

  return [state, dispatch];
};

export default useInput;
