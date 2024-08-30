import {
  StyledBiErrorCircle,
  StyledContainer,
  StyledContainerProps,
  StyledGiCheckMark,
  StyledInputProps,
  StyledRightContainer,
  StyledSpinner,
  StyledTextarea,
  TextareaWrapper,
} from 'components/common/form/Input.styled';
import { useInput } from 'components/common/hooks';
import React, { useRef } from 'react';
import { Validator } from 'validators';

type Props = Omit<React.ComponentProps<'textarea'>, keyof StyledInputProps> &
  StyledInputProps &
  StyledContainerProps & {
    label?: string;
    rightContainer?: React.ReactNode;
    validate?: Validator;
  };

const Textarea: React.FC<Props> = ({ label, fullwidth, rightContainer, validate, ...props }) => {
  const rightContainerRef = useRef<HTMLDivElement>(null);

  const { state, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const events = { onChange, onBlur, onFocus };

  return (
    <StyledContainer fullwidth={fullwidth}>
      <TextareaWrapper label={label} size={props.size}>
        <StyledTextarea {...props} {...events} rightcontainerwidth={rightContainerRef.current?.offsetWidth} />
        <StyledRightContainer ref={rightContainerRef}>
          {state.dirty && validate && (
            <span>
              {state.validating ? (
                <StyledSpinner />
              ) : state.valid ? (
                <StyledGiCheckMark />
              ) : (
                <StyledBiErrorCircle title={state.error} />
              )}
            </span>
          )}
          {rightContainer}
        </StyledRightContainer>
      </TextareaWrapper>
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Textarea;
