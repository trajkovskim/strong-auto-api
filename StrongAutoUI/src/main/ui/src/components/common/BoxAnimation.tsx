import { css } from '@emotion/css';
import Transition, { TransitionHandle } from 'components/common/Transition';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

type StyledContainerProps = {
  fullwidth?: boolean;
  fullheight?: boolean;
};

type Props = React.PropsWithChildren &
  StyledContainerProps & {
    threshold?: number;
    duration?: string;
  };

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${(props) => props.fullwidth && '100%'};
  height: ${(props) => props.fullheight && '100%'};
`;

const BoxAnimation: React.FC<Props> = ({ threshold: threshold = 0.2, duration = '400ms', ...props }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<TransitionHandle>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const intersectionObserverCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        transitionRef.current?.gotoFinalState();
      }
    };

    const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, { threshold });

    intersectionObserver.observe(element);

    return () => {
      intersectionObserver.unobserve(element);
      intersectionObserver.disconnect();
    };
  }, [threshold]);

  return (
    <Transition
      ref={transitionRef}
      duration={duration}
      transition={{
        initial: css`
          transform: translateY(-40px);
          opacity: 0 !important;
        `,
        final: css`
          transform: translateY(0);
          opacity: 1 !important;
        `,
      }}
    >
      <StyledContainer fullheight={props.fullheight} fullwidth={props.fullwidth} ref={elementRef}>
        {props.children}
      </StyledContainer>
    </Transition>
  );
};

export default React.memo(BoxAnimation);
