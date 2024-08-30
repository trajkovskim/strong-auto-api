import { Container } from 'components/common';
import { StyledButton, StyledNavigationWrapper } from 'components/layout/Navigation.styled';
import { NavigationOption, useNavigationOptions } from 'hooks';
import React from 'react';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import { Breakpoints } from 'theme';

const NavigationInnerOptions = styled(Container)<{ align: 'left' | 'right' | 'bottom' | 'top' }>`
  position: absolute;
  background-color: white;
  color: black;
  width: max-content;

  transform: ${(props) => props.align === 'bottom' && 'translateY(100%)'};
  bottom: ${(props) => props.align === 'bottom' && 0};

  top: ${(props) => props.align !== 'bottom' && 0};

  transform: ${(props) => props.align === 'top' && 'translateY(-100%)'};

  transform: ${(props) => props.align === 'right' && 'translateX(100%)'};
  right: ${(props) => props.align === 'right' && 0};

  transform: ${(props) => props.align === 'left' && 'translateX(-100%)'};
  left: ${(props) => props.align === 'left' && 0};

  opacity: 0;
  visibility: hidden;

  transition: 200ms;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const StyledContainer = styled(Container)`
  button:hover + div,
  button + div:hover {
    visibility: visible;
    opacity: 1;
  }
`;

type InnerOptionsProps = {
  option: NavigationOption;
  depth?: number;
};

const NavigationOptionCreator: React.FC<InnerOptionsProps> = ({ depth = 0, ...props }) => {
  const createButton = (iconRight?: React.ReactNode, leftPadding?: Breakpoints) => (
    <StyledButton
      padding={{ top: 'md', bottom: 'md', right: 'lg', left: leftPadding }}
      size="md"
      iconSize="lg"
      themeType="link"
      iconRight={iconRight}
      icon={props.option.icon}
      active={props.option.active}
      onClick={props.option.navigate}
    >
      {props.option.label}
    </StyledButton>
  );

  if (!props.option.options) {
    return createButton(undefined, depth !== 0 ? 'md' : undefined);
  }

  return (
    <StyledContainer key={props.option.label} xs={12} lg="max-content" styleConfig={{ relative: true }}>
      {createButton(depth === 0 ? <MdArrowDropDown /> : <MdArrowRight />, depth !== 0 ? 'md' : undefined)}
      <NavigationInnerOptions styleConfig={{ rounded: true }} align={depth === 0 ? 'bottom' : 'right'}>
        {Object.values(props.option.options).map((option) => (
          <>
            <NavigationOptionCreator option={option} depth={depth + 1} />
            {/* {allOptions.length - 1 !== index && <Line />} */}
          </>
        ))}
      </NavigationInnerOptions>
    </StyledContainer>
  );
};

const Navigation: React.FC = () => {
  const navOptions = useNavigationOptions();

  return (
    <StyledNavigationWrapper>
      <Container
        styleConfig={{
          direction: 'row',
          wrap: true,
          justifyContent: 'flex-end',
        }}
      >
        {Object.values(navOptions).map((option) => (
          <NavigationOptionCreator key={option.label} option={option} />
        ))}
      </Container>
    </StyledNavigationWrapper>
  );
};

export default Navigation;
