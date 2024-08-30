import Button from 'components/common/Button';
import { FormFieldState } from 'components/common/hooks/useInput';
import { StyledBiErrorCircle, StyledGiCheckMark, StyledRightContainer } from 'components/common/form/Input.styled';
import { Size } from 'components/common/form/types';
import StyledSpinner from 'components/common/Spinner';
import React from 'react';
import { MdClear } from 'react-icons/md';

type Props = {
  state: FormFieldState;
  validate?: boolean;
  size?: Size;
  clearButton?: boolean;
  onClear?: () => void;
  rightContainer?: React.ReactNode;
  value?: string;
};

const FormFieldRightContainer = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { state } = props;
  return (
    <StyledRightContainer ref={ref}>
      {state.dirty && props.validate && (
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
      {props.clearButton && !!props.value && (
        <Button themeType="link" size={props.size} maxContent icon={<MdClear />} onClick={props.onClear} />
      )}
      {props.rightContainer}
    </StyledRightContainer>
  );
});

FormFieldRightContainer.displayName = 'FormFieldRightContainer';

export default FormFieldRightContainer;
