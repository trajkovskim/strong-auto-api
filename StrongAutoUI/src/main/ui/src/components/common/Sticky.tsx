import React, { useEffect } from 'react';
import styled from 'styled-components';

type StickyWrapperProps = {
  top?: number;
  bottom?: number;
  zIndex?: number;
};

const StickyWrapper = styled.div<StickyWrapperProps>`
  position: sticky;

  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  z-index: ${(props) => props.zIndex};
`;

type Props = React.PropsWithChildren & StickyWrapperProps;

const Sticky: React.FC<Props> = (props) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new IntersectionObserver(([entry]) => {
      // entry.target.toggleAttribute()
    });
  });

  return <StickyWrapper {...props}>{props.children}</StickyWrapper>;
};

export default Sticky;
