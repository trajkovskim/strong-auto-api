import React from 'react';
import { styled } from 'styled-components';

import { Container, Line } from 'components/common';
import LogoImage from 'components/layout/LogoImage';
import MobileNavigation from 'components/layout/MobileNavigation';
import Navigation from 'components/layout/Navigation';

type WrapperProps = {
  transparent?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) => !props.transparent && '#232628'};
  color: white;
  z-index: 10 !important;
  position: sticky;
  top: 0;
`;

const StyledContainer = styled(Container)`
  z-index: 2;
  height: 80px;
`;

const StyledLineContainer = styled(Container)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

type Props = WrapperProps;

const Navbar: React.FC<Props> = (props) => {
  return (
    <Wrapper transparent={props.transparent}>
      <StyledContainer
        styleConfig={{
          padding: { left: 'xs', right: 'xs' },
          relative: true,
          direction: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        lgStyle={{
          justifyContent: 'start',
          gap: '2rem',
        }}
      >
        <Container xs={1} lg={0} styleConfig={{ direction: 'row', gap: '0.5rem' }}>
          {/* <TelephoneButton />
          <EmailButton /> */}
        </Container>
        <LogoImage />
        <StyledLineContainer xs={0} lg="max-content" styleConfig={{ alignSelf: 'stretch' }}>
          <Line type="vertical" />
        </StyledLineContainer>
        <Container xs={0} lg="max-content" styleConfig={{ alignItems: 'center' }}>
          <Navigation />
        </Container>

        <Container
          xs="max-content"
          lg={0}
          styleConfig={{
            direction: 'row',
            padding: { right: 'md' },
            gap: '1rem',
            alignItems: 'stretch',
          }}
        >
          <Line type="vertical" />
          <MobileNavigation />
        </Container>
      </StyledContainer>
    </Wrapper>
  );
};

export default Navbar;
