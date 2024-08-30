import FormContextProvider from 'components/common/form/FormContextProvider';
import { useForm } from 'components/common/hooks';
import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props<T> = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  initValues?: T;
  onSubmit?: (values: T) => void;
};

// const getFormValues = (element: HTMLFormElement) => {
//   const formData = new FormData(element);
//   const keysCount: Map<string, number> = new Map();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const values: Record<string, any> = {};

//   for (const [key] of formData.entries()) {
//     if (!keysCount.has(key)) {
//       keysCount.set(key, 0);
//     }

//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     keysCount.set(key, keysCount.get(key)! + 1);
//   }

//   for (const [key, value] of formData.entries()) {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     if (keysCount.get(key)! > 1) {
//       if (!values[key]) {
//         values[key] = [];
//       }

//       values[key] = [...values[key], value];
//     } else {
//       values[key] = value;
//     }
//   }

//   return values;
// };

const StyledForm = styled.form`
  width: 100%;
`;

const Form = <T extends object>(props: Props<T>) => {
  const { setValues, values } = useForm<T>();

  useEffect(() => {
    setValues(props.initValues ?? ({} as T));
  }, [props.initValues, setValues]);

  const events: {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  } = {
    onSubmit: (event) => {
      event.preventDefault();
      props.onSubmit && props.onSubmit(values);
    },
  };
  return (
    <StyledForm {...props} {...events}>
      {props.children}
    </StyledForm>
  );
};

const FormWithProvider = <T extends object>(props: Props<T>) => {
  return (
    <FormContextProvider>
      <Form {...props} />
    </FormContextProvider>
  );
};

export default FormWithProvider;
