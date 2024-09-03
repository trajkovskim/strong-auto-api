import rootReducer, { initialState } from 'context/root';
import { Action, ApplicationContextState } from 'context/types';
import React, { useEffect, useReducer } from 'react';

type ApplicationContextType = {
  dispatch: (action: Action) => void;
  state: ApplicationContextState;
};

export const ApplicationContext = React.createContext<ApplicationContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  dispatch: (action: unknown) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  state: {} as ApplicationContextState,
});

type Props = React.PropsWithChildren;

const ApplicationContextProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    localStorage.setItem('language', state.base.language);
  }, [state.base.language]);

  const value = {
    dispatch,
    state,
  };

  return <ApplicationContext.Provider value={value}>{props.children}</ApplicationContext.Provider>;
};

export default ApplicationContextProvider;
