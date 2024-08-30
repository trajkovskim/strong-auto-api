import { Breadcrumb, Container } from 'components/common';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';
import styled from 'styled-components';

type StyledPageHeaderProps = {
  imageSrc?: string;
};

const StyledPageHeader = styled(Container)<StyledPageHeaderProps>`
  background-image: ${(props) => props.imageSrc && `url(${props.imageSrc})`};
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  min-height: 300px;
  position: relative;
  color: #fff;

  &::before {
    content: '';
    background-color: #232323;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    top: 0;
    left: 0;
  }
  & > * {
    z-index: 1;
  }
`;

type Props = React.PropsWithChildren & StyledPageHeaderProps & React.ComponentProps<typeof Container>;

const PageHeader: React.FC<Props> = ({ children, imageSrc, ...props }) => {
  return (
    <StyledPageHeader imageSrc={imageSrc}>
      <Container
        {...props}
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          gap: '3rem',
          padding: { left: 'md', right: 'md' },
          alignItems: 'center',
          centered: true,
          ...props.styleConfig,
        }}
        lgStyle={{
          direction: 'row-reverse',
          justifyContent: 'space-between',
          ...props.lgStyle,
        }}
      >
        <Breadcrumb />
        {children}
      </Container>
    </StyledPageHeader>
  );
};

export default PageHeader;
