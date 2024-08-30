import { ChangeEventHandler, FocusEventHandler, useEffect, useState } from 'react';
import { Validator } from 'validators';

export type FormFieldState = {
  error?: string;
  touched?: boolean;
  validating?: boolean;
  visited?: boolean;
  modified?: boolean;
  active?: boolean;
  dirty?: boolean;
  valid: boolean;
  initial: string | number | readonly string[] | undefined;
};

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
  defaultValue?: string | number | readonly string[] | undefined,
  onChange1?: ChangeEventHandler<T>,
  onFocus1?: FocusEventHandler<T>,
  onBlur1?: FocusEventHandler<T>,
  validate?: Validator
) => {
  const [error, setError] = useState<string>(); // error message
  const [touched, setTouched] = useState<boolean>(); // whether element has been ever blured (defocused)
  const [visited, setVisited] = useState<boolean>(); // whether element has been ever focused
  const [modified, setModified] = useState<boolean>(); // whether element has been ever modified
  const [active, setActive] = useState<boolean>(); // whether element has focus now
  const [dirty, setDirty] = useState<boolean>(); // whether element value is different from the initial
  const [validating, setValidating] = useState<boolean>();
  const valid = !error; // whether element has valid value
  const initial = defaultValue; // initial value using the prop defaultValue

  useEffect(() => {
    if (!validate) {
      return;
    }

    setValidating(true);
    const timeout = setTimeout(() => setValidating(false), 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [validate]);

  const changeValue = (value: string | undefined) => {
    const message = validate && validate(value);
    setError(message);
    setModified(true);
    setDirty(initial !== value);
  };

  const onChange: ChangeEventHandler<T> = (event) => {
    onChange1 && onChange1(event);
    changeValue(event.target.value);
  };

  const onFocus: FocusEventHandler<T> = (event) => {
    onFocus1 && onFocus1(event);
    setVisited(true);
    setActive(true);
  };

  const onBlur: FocusEventHandler<T> = (event) => {
    onBlur1 && onBlur1(event);
    setTouched(true);
    setActive(false);
  };

  const state: FormFieldState = { error, touched, validating, visited, modified, active, dirty, valid, initial };

  return {
    onChange,
    onFocus,
    onBlur,
    changeValue,
    state,
  };
};
export default useInput;
