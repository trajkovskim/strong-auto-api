import type { Language } from 'context/base';
import { setLanguageAction } from 'context/base/action';
import useApplicationContext from 'hooks/useApplicationContext';
import { useCallback } from 'react';

const useLanguage = () => {
  const { dispatch, state } = useApplicationContext();

  const changeLanguage = useCallback(
    (language: Language) => {
      dispatch(setLanguageAction(language));
    },
    [dispatch]
  );

  const language = state.base?.language;

  return { changeLanguage, language };
};

export default useLanguage;
