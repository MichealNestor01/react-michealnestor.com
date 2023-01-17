import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        value: action.value,
      };
    case "BLUR":
      return {
        ...state,
        isTouched: true,
      };
    case "RESET":
      return initialInputState;
    default:
      return initialInputState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangedHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const valueInputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => dispatch({ type: "RESET" });

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangedHandler,
    valueInputBlurHandler,
    reset,
  };
};
export default useInput;
