import { Action } from 'context/types';

export enum Language {
  EN = 'en',
  MK = 'mk',
}

export type BaseState = {
  language: Language;
};

export type BaseReduceFunction<A extends Action> = (state: BaseState, action: A) => BaseState;

export type SetLanguageActionType = Action & {
  language?: Language;
};

export type SetLanguageAction = (language?: Language) => SetLanguageActionType;
