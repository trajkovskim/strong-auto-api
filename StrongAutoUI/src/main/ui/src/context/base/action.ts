import { SetLanguageAction } from 'context/base/types';

export const SET_LANGUAGE_ACTION = 'STRONGAUTO@SET_LANGUAGE';

export const setLanguageAction: SetLanguageAction = (language) => ({
  type: SET_LANGUAGE_ACTION,
  language,
});
