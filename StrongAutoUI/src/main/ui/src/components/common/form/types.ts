import { StyledContainerProps, StyledInputProps } from 'components/common/form/Input.styled';
import { FontSize } from 'components/common/typography/types';
import { Validator } from 'validators';

export type FormFieldValue = string | string[] | boolean | boolean[] | number | undefined | null;

export type FormContextType<T> = {
  values: T;
  change: (name: keyof T, value: FormFieldValue) => void;
  getValue: (name: keyof T) => FormFieldValue;
  setValues: (value: T | ((values: T) => T)) => void;
};

export type Size = FontSize;

export type DropdownOption = {
  value: string;
  label?: string;
};

export type AutocompleteOption = {
  label?: React.ReactNode;
  value: string;
};

export type FormFieldProps<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>> = Omit<
  React.ComponentProps<T>,
  keyof StyledInputProps
> &
  StyledInputProps &
  StyledContainerProps & {
    label?: string;
    rightContainer?: React.ReactNode;
    validate?: Validator;
    clearButton?: boolean;
  };
