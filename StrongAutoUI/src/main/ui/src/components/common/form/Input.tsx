import { useForm, useInput } from 'components/common/hooks';
import { StyledContainer, StyledFormFieldContainer, StyledInput } from 'components/common/form/Input.styled';
import FormFieldRightContainer from 'components/common/form/RightContainer';
import { FormFieldProps } from 'components/common/form/types';
import { parseInputValue } from 'components/common/form/utils';
import React, { useRef } from 'react';

type Props = FormFieldProps<'input'>;

const Input: React.FC<Props> = ({ label, fullwidth, rightContainer, clearButton, validate, ...props }) => {
  const rightContainerRef = useRef<HTMLDivElement>(null);

  const { change, getValue } = useForm();
  const name = props.name as string;
  const value = getValue(name);

  const { state, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const events: {
    onChange: typeof onChange;
    onBlur: typeof onBlur;
    onFocus: typeof onFocus;
  } = {
    onChange: (event) => {
      change(name, parseInputValue(event.target));
      onChange(event);
    },
    onBlur,
    onFocus,
  };

  const clear = () => {
    change(name, undefined);
  };

  const rightContainerProps = {
    state,
    rightContainer,
    clearButton,
    validate: !!validate,
    size: props.size,
    onClear: clear,
    value: value?.toString(),
  };

  return (
    <StyledContainer fullwidth={fullwidth}>
      <StyledFormFieldContainer label={label} size={props.size}>
        <StyledInput
          {...props}
          {...events}
          value={value ? value.toString() : ''}
          rightcontainerwidth={rightContainerRef.current?.offsetWidth}
        />
      </StyledFormFieldContainer>
      <FormFieldRightContainer ref={rightContainerRef} {...rightContainerProps} />
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Input;
