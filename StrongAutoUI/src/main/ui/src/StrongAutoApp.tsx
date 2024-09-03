import { FloatButton } from 'antd';
import { Footer } from 'components/layout';
import ApplicationContextProvider from 'context';
import React, { useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { scrollToTop } from 'utils';

const StyledLayout = styled.div`
  min-height: 100dvh;

  > main {
    min-height: 100dvh;
  }
  background-color: white;
`;

const StrongAutoApp: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(scrollToTop, 0);
  }, [location]);

  return (
    <ApplicationContextProvider>
      <div>
        <StyledLayout>
          <main>
            <Outlet />
          </main>
          <Footer />
        </StyledLayout>
        <FloatButton icon={<BsArrowUp />} onClick={scrollToTop} type="primary" />
      </div>
    </ApplicationContextProvider>
  );
};

export default StrongAutoApp;
