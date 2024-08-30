export type ValidatorValue = string | undefined;

export type Validator<T = unknown> = (value: ValidatorValue, allValues?: T) => ValidatorReturn;

export type ValidatorReturn = string | undefined;

type Message = {
  message: string;
};

export const combine =
  <T>(validators: Validator<T>[]) =>
  (value: string, allValues: T) => {
    for (const validator of validators) {
      const message = validator(value, allValues);
      if (message) {
        return message;
      }
    }

    return undefined;
  };

type WithMessageValidator<M extends Message = Message, T = unknown> = (params: M) => Validator<T>;

export const requiredValidator: WithMessageValidator =
  ({ message }) =>
  (value) => {
    const trimedValue = value?.trim();
    return trimedValue === '' || trimedValue === null || trimedValue === undefined ? message : undefined;
  };
