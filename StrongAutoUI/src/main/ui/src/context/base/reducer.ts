import { SET_LANGUAGE_ACTION } from 'context/base/action';
import { BaseReduceFunction, BaseState, Language, SetLanguageActionType } from 'context/base/types';
import { mapToAction } from 'context/utils';

export const initialState: BaseState = {
  language: (localStorage.getItem('language') as Language | null) ?? Language.MK,
};

export const setLanguage: BaseReduceFunction<SetLanguageActionType> = (state, action) => ({
  ...state,
  language: action.language ?? state.language,
});

const baseReducer = mapToAction(
  {
    [SET_LANGUAGE_ACTION]: setLanguage,
  },
  initialState
);

export default baseReducer;
