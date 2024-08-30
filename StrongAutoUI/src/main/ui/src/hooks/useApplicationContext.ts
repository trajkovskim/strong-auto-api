import { ApplicationContext } from 'context';
import { useContext } from 'react';

const useApplicationContext = () => {
  const { dispatch, getState } = useContext(ApplicationContext);

  return { dispatch, getState };
};

export default useApplicationContext;
