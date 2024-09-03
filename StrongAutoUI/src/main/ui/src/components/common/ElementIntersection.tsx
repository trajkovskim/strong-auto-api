import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type StyledContainerProps = {
  fullwidth?: boolean;
  fullheight?: boolean;
};

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${(props) => props.fullwidth && '100%'};
  height: ${(props) => props.fullheight && '100%'};
`;

export type Props = React.PropsWithChildren &
  StyledContainerProps & {
    onEnter: (ref: HTMLDivElement | null) => void;
    onLeave?: (ref1: HTMLDivElement | null) => void;
    threshold?: number;
  };

const ElementIntersection: React.FC<Props> = ({ threshold = 0.2, ...props }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const intersectionObserverCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        props.onEnter(elementRef.current);
      } else {
        props.onLeave?.(elementRef.current);
      }
    };

    const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, { threshold });

    intersectionObserver.observe(element);

    return () => {
      intersectionObserver.unobserve(element);
      intersectionObserver.disconnect();
    };
  }, [props, threshold]);

  return (
    <StyledContainer fullheight={props.fullheight} fullwidth={props.fullwidth} ref={elementRef}>
      {props.children}
    </StyledContainer>
  );
};

export default React.memo(ElementIntersection);
