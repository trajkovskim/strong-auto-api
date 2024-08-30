import { Button } from 'components/common';
import styled from 'styled-components';
import theme from 'theme';

export const StyledNavigationWrapper = styled.nav`
  position: relative;
`;

// export const MobileContainer = styled(Container)`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   color: black;
//   height: 100dvh;
//   z-index: 100;
//   background-color: rgba(35, 35, 35, 0.95);
//   color: #fff;
// `;

export const StyledButton = styled(Button)<{ active?: boolean }>`
  transition: all 200ms;
  user-select: none;

  justify-content: start;

  color: ${(props) => props.active && theme.navigation.activeColor};

  &:hover {
    border-bottom-color: #075ebb;
  }
`;
