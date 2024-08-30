import { css } from '@emotion/css';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import Transition, { TransitionHandle } from 'components/common/Transition';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  *:last-child {
    margin-left: auto;
  }
`;

type Props = Omit<React.ComponentProps<typeof Container>, 'children'> &
  React.PropsWithChildren & {
    buttonProps?: React.ComponentProps<typeof StyledButton>;
    containerProps?: Omit<React.ComponentProps<typeof Container>, 'children'>;
    header: React.ReactNode;
    defaultState?: 'open' | 'closed';
    gap?: React.CSSProperties['gap'];
    onOpen?: () => void;
    onClose?: () => void;
  };

export type AccordionHandle = {
  transition: TransitionHandle | null;
  container: HTMLDivElement | null;
  toggle: () => void;
  isOpened: () => boolean;
};

const Accordion = React.forwardRef<AccordionHandle, Props>(
  ({ defaultState = 'closed', children, buttonProps, containerProps, header, gap, onOpen, onClose, ...props }, ref) => {
    const transitionRef = useRef<TransitionHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<number>();

    useEffect(() => {
      if (defaultState === 'open') {
        transitionRef.current?.gotoFinalState();
      }

      setMaxHeight(containerRef.current?.scrollHeight);
      const resizeHandler = () => {
        setMaxHeight(containerRef.current?.scrollHeight);
      };

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }, [defaultState]);

    const toggle = () => {
      if (transitionRef.current?.isInFinalState()) {
        containerRef.current?.style.setProperty('overflow', 'hidden');
        containerRef.current?.style.removeProperty('max-height');
      }
      transitionRef.current?.toggle();
    };

    useImperativeHandle(ref, () => ({
      container: containerRef.current,
      transition: transitionRef.current,
      toggle,
      isOpened: () => !!transitionRef.current?.isInFinalState(),
    }));

    return (
      <Container {...props}>
        <StyledButton themeType="link" iconRight={<BiPlus />} size="lg" fullwidth onClick={toggle} {...buttonProps}>
          {header}
        </StyledButton>
        <Transition
          ref={transitionRef}
          duration="200ms"
          timingFunction="ease-in-out"
          transition={{
            initial: css`
              overflow: hidden;
              max-height: 0;
            `,
            final: css`
              padding-top: ${gap};
              max-height: ${Math.max(
                containerRef.current?.scrollHeight ?? 0,
                containerRef.current?.children.item(0)?.scrollHeight ?? 0,
                maxHeight ?? 0
              ) + 10}px;
            `,
          }}
          onInitalEnd={() => onClose?.()}
          onFinalEnd={() => {
            containerRef.current?.style.setProperty('overflow', 'visible');
            // containerRef.current?.style.setProperty('max-height', '100%');
            onOpen?.();
          }}
        >
          <Container {...containerProps} ref={containerRef}>
            {children}
          </Container>
        </Transition>
      </Container>
    );
  }
);

Accordion.displayName = 'Accordion';

export default Accordion;
