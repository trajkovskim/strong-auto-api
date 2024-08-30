/* eslint-disable @typescript-eslint/no-explicit-any */
type Reducer<S, A> = (state: S, action: A) => S;

export const combineReducers = <S extends object>(
  reducers: Record<keyof S, Reducer<S[keyof S], any>>
): Reducer<S, any> => {
  const newState = {} as S;

  return (state: S, action: any) => {
    for (const [key, value] of Object.entries(reducers)) {
      const reducerkey = key as keyof S;
      const reducer = value as Reducer<S[keyof S], any>;

      const newStateForReducer = reducer(state[reducerkey], action);
      newState[reducerkey] = newStateForReducer;
    }

    return { ...newState };
  };
};

export const mapToAction =
  <S>(actions: Record<string, Reducer<S, any>>, initialState: S) =>
  (state: S, action: any) => {
    for (const [type, performer] of Object.entries(actions)) {
      if (type === action.type) {
        return performer(state, action);
      }
    }

    return state ?? initialState;
  };
