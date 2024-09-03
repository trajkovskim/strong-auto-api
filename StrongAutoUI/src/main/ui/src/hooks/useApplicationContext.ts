import { ApplicationContext } from 'context';
import { useContext } from 'react';

const useApplicationContext = () => {
  const { dispatch, state } = useContext(ApplicationContext);

  return { dispatch, state };
};

export default useApplicationContext;
