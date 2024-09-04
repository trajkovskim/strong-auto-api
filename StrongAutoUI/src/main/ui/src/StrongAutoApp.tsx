import { Footer } from 'components/layout';
import { BackToTopButton } from 'components/layout/BackToTopButton';
import ApplicationContextProvider from 'context';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled.div`
  min-height: 100dvh;

  > main {
    min-height: 100dvh;
  }
  background-color: white;
`;

const StrongAutoApp: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div>
        <StyledLayout>
          <main>
            <Outlet />
          </main>
          <Footer />
        </StyledLayout>
        <BackToTopButton />
      </div>
    </ApplicationContextProvider>
  );
};

export default StrongAutoApp;
