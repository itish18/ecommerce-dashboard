import { useState } from "react";

export const useInput = (validFunction, message) => {
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateInputs = (validationRules) => {
    const errors = {};

    for (const name in validationRules) {
      const rules = validationRules[name];
      const value = inputValues[name];
      let error = null;

      for (const rule of rules) {
        if (rule.required && (!value || value.trim() === "")) {
          error = "This field is required.";
        } else if (rule.minLength && value.length < rule.minLength) {
          error = `Must be at least ${rule.minLength} characters long.`;
        } else if (rule.maxLength && value.length > rule.maxLength) {
          error = `Must be at most ${rule.maxLength} characters long.`;
        } else if (rule.pattern && !rule.pattern.test(value)) {
          error = rule.error || "Invalid input.";
        }

        if (error) {
          errors[name] = error;
          break;
        }
      }
    }

    setInputErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return {
    inputValues,
    inputErrors,
    handleInputChange,
    validateInputs,
  };
};

export default useInput;
