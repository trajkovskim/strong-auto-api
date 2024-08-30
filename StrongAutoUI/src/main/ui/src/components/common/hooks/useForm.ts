import { FormContext } from 'components/common/form/FormContextProvider';
import { FormContextType, FormFieldValue } from 'components/common/form/types';
import { useContext } from 'react';

const useForm = <T = Record<string, FormFieldValue>>() => {
  return useContext(FormContext) as FormContextType<T>;
};

export default useForm;
