import Container from 'components/common/Container';
import { checkboxSize } from 'components/common/form/constants';
import { StyledFormFieldContainer, StyledInput } from 'components/common/form/Input.styled';
import { FormFieldValue } from 'components/common/form/types';
import { useForm } from 'components/common/hooks';
import Label from 'components/common/typography/Label';
import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled(StyledFormFieldContainer)`
  & > input {
    width: ${(props) => props.size && checkboxSize[props.size]};
    height: ${(props) => props.size && checkboxSize[props.size]};
  }

  &:has(> input:checked) + label {
    transition: 100ms all;
    color: #075ebb;
  }
`;

type Props = React.ComponentProps<typeof StyledInput> & {
  label?: string;
};

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
  const { change, getValue } = useForm();
  const name = props.name as string;
  const fieldValue = getValue(name);

  const checked = Array.isArray(fieldValue)
    ? fieldValue.includes(props.value as never)
    : fieldValue === (props.value ?? true);

  const update = (targetChecked: boolean) => {
    const checkboxValue = props.value?.toString() ?? targetChecked;
    if (Array.isArray(fieldValue)) {
      if (targetChecked) {
        change(name, [...fieldValue, checkboxValue] as FormFieldValue);
      } else if (fieldValue.length === 1) {
        change(name, undefined);
      } else {
        fieldValue.splice(fieldValue.indexOf(checkboxValue as never), 1);
        change(name, [...fieldValue] as FormFieldValue);
      }
    } else if (fieldValue && targetChecked) {
      change(name, [fieldValue, checkboxValue] as FormFieldValue);
    } else if (targetChecked) {
      change(name, checkboxValue);
    } else {
      change(name, undefined);
    }
  };

  const handleClick = () => {
    update(!checked);
  };

  const events: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  } = {
    onChange: (event) => {
      props.onChange && props.onChange(event);
      update(event.target.checked);
    },
  };

  const id = `${props.name}_${props.value}`;
  return (
    <Container styleConfig={{ gap: '0.5rem', direction: 'row', alignItems: 'center', userSelect: 'none' }}>
      <CheckboxWrapper size={props.size}>
        <StyledInput id={id} type="checkbox" checked={checked} {...props} {...events} />
      </CheckboxWrapper>
      <Label nowrap fontSize={props.size} onClick={handleClick}>
        {label}
      </Label>
    </Container>
  );
};

export default Checkbox;
