import { css } from '@emotion/css';
import ElementIntersection from 'components/common/ElementIntersection';
import Transition, { TransitionHandle } from 'components/common/Transition';
import React, { useRef } from 'react';

type ElementIntersectionProps = React.ComponentProps<typeof ElementIntersection>;
type Props = Omit<ElementIntersectionProps, 'onEnter'> & {
  duration?: string;
  onEnter?: ElementIntersectionProps['onEnter'];
};

const BoxAnimation: React.FC<Props> = ({ duration = '400ms', ...props }) => {
  const transitionRef = useRef<TransitionHandle>(null);

  return (
    <ElementIntersection
      {...props}
      onEnter={(ref) => {
        if (transitionRef.current?.isInInitialState) {
          transitionRef.current?.gotoFinalState();
        }
        props.onEnter?.(ref);
      }}
    >
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
        {props.children}
      </Transition>
    </ElementIntersection>
  );
};

export default BoxAnimation;
