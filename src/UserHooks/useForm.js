import React, { useCallback, useRef, useMemo } from "react";

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export function useFormWithValidation(initialValue = {}) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const initialState =
    useRef(
      initialValue
    ); /*храним в локальной переменной начальное состояние объекта*/

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const isDirty = useMemo(() => {
    const initial = initialState.current;
    /* перебора ключей объекта */
    return Object.keys(values).some((key) => {
      return !initial[key] || initial[key] !== values[key];
    });
  }, [values]);
  return {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
    setValues,
    isDirty,
  };
}
