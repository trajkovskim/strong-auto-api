import Button from 'components/common/Button';
import Container from 'components/common/Container';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  border-bottom: 1px solid #bdb9b976;

  > * {
    width: 100%;
  }
`;

type StyledButtonProps = {
  active?: boolean;
};

const StyledButton = styled(Button)<StyledButtonProps>`
  padding-bottom: 8px;
  border-bottom: 2px solid ${(props) => (props.active ? '#046af2' : 'transparent')};
  color: ${(props) => props.active && '#046af2'};
  transition: all 200ms;
  &:hover {
    border-bottom: 2px solid #046af2;
  }
`;

export type ButtonProps = {
  onClick?: () => void;
  label: string;
  value: string;
};

type Props = {
  onChange?: (button: ButtonProps) => void;
  buttons: ButtonProps[];
  active?: string;
};

const TabButtonsGroup: React.FC<Props> = (props) => {
  return (
    <StyledContainer styleConfig={{ direction: 'row', alignItems: 'flex-start', gap: '1rem' }}>
      {props.buttons.map((button) => (
        <StyledButton
          key={button.value}
          size="lg"
          themeType="link"
          active={props.active === button.value}
          onClick={() => {
            button.onClick && button.onClick();
            props.onChange && props.onChange(button);
          }}
        >
          {button.label}
        </StyledButton>
      ))}
    </StyledContainer>
  );
};

export default TabButtonsGroup;
