import Container from 'components/common/Container';
import { StyledOption, StyledSelect } from 'components/common/form/Dropdown.styled';
import {
  SelectWrapper,
  StyledBiErrorCircle,
  StyledContainer,
  StyledGiCheckMark,
  StyledRightContainer,
  StyledSpinner,
} from 'components/common/form/Input.styled';
import type { DropdownOption, FormFieldProps } from 'components/common/form/types';
import { useInput } from 'components/common/hooks';
import Label from 'components/common/typography/Label';
import Text from 'components/common/typography/Text';
import React, { useRef } from 'react';

type Props = FormFieldProps<'select'> & {
  options: DropdownOption[];
};

const Dropdown: React.FC<Props> = ({ fullwidth, rightContainer, validate, ...props }) => {
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
      <Container styleConfig={{ direction: 'row', gap: '1rem', alignItems: 'center' }}>
        {props.label && (
          <Label nowrap fontSize={props.size}>
            {props.label}
          </Label>
        )}
        <SelectWrapper size={props.size}>
          <StyledSelect {...props} {...events} rightcontainerwidth={rightContainerRef.current?.offsetWidth}>
            {props.options.map((option) => (
              <StyledOption key={option.value} value={option.value}>
                <Text fontSize={props.size}>{option.label ?? option.value}</Text>
              </StyledOption>
            ))}
          </StyledSelect>
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
        </SelectWrapper>
      </Container>
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Dropdown;
