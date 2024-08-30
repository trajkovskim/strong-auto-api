import { FormContextType, FormFieldValue } from 'components/common/form/types';
import React, { createContext, useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<FormContextType<any>>({
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (name, value) => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getValue: (name) => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValues: () => undefined,
});

type Props = React.PropsWithChildren;

const FormContextProvider = <T extends Record<string, FormFieldValue>>(props: Props) => {
  const [state, setState] = useState<T>({} as T);

  const getValue: FormContextType<T>['getValue'] = (name) => state[name];
  const change: FormContextType<T>['change'] = useCallback(
    (name, value) => setState((prev) => ({ ...prev, [name]: value })),
    []
  );

  const value: FormContextType<T> = {
    getValue,
    change,
    setValues: setState,
    values: state,
  };

  return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>;
};

export default FormContextProvider;
