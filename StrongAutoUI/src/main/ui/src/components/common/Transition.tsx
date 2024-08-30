/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/css';
import React, { useCallback, useEffect, useImperativeHandle, useReducer } from 'react';

export enum TransitionState {
  RUNNING,
  FINISHED,
}

export enum ComponentState {
  INITIAL,
  FINAL,
}

type TransitionStateReducer = {
  componentState: ComponentState;
  transitionState: TransitionState;
};

type TransitionAction = {
  type: 'GOTO_FINAL_STATE' | 'GOTO_INITIAL_STATE' | 'TOGGLE' | 'RESET' | 'FINISH';
};

const gotoFinalStateAction = (): TransitionAction => ({
  type: 'GOTO_FINAL_STATE',
});

const gotoInitialStateAction = (): TransitionAction => ({
  type: 'GOTO_INITIAL_STATE',
});

const toggleAction = (): TransitionAction => ({
  type: 'TOGGLE',
});

const resetAction = (): TransitionAction => ({
  type: 'RESET',
});

const finishAction = (): TransitionAction => ({
  type: 'FINISH',
});

const reducer: React.Reducer<TransitionStateReducer, TransitionAction> = (state, action) => {
  const actions: Record<TransitionAction['type'], () => TransitionStateReducer> = {
    GOTO_FINAL_STATE: () => ({
      componentState: ComponentState.FINAL,
      transitionState: TransitionState.RUNNING,
    }),
    GOTO_INITIAL_STATE: () => ({
      componentState: ComponentState.INITIAL,
      transitionState: TransitionState.RUNNING,
    }),
    TOGGLE: () => {
      return reducer(
        state,
        state.componentState === ComponentState.FINAL ? gotoInitialStateAction() : gotoFinalStateAction()
      );
    },
    RESET: () => ({
      componentState: ComponentState.INITIAL,
      transitionState: TransitionState.FINISHED,
    }),
    FINISH: () => ({
      ...state,
      transitionState: TransitionState.FINISHED,
    }),
  };

  if (action.type in actions) {
    return actions[action.type]();
  }

  return state;
};

const initialTransitionReducerState: TransitionStateReducer = {
  componentState: ComponentState.INITIAL,
  transitionState: TransitionState.FINISHED,
};

export type TransitionHandle = {
  state: TransitionState;
  componentState: ComponentState;
  gotoFinalState: () => void;
  gotoInitialState: () => void;
  toggle: () => void;
  reset: () => void;
  isInInitialState: () => boolean;
  isInFinalState: () => boolean;
  isRunning: () => boolean;
  isFinished: () => boolean;
};

type AnimationEventFunction = () => void;

type StyledAnimatedProps = {
  transition: { initial?: string; final: string };
  property?: React.CSSProperties['transitionProperty'];
  duration?: React.CSSProperties['transitionDuration'];
  delay?: React.CSSProperties['transitionDelay'];
  timingFunction?: React.CSSProperties['transitionTimingFunction'];
  onInitalEnd?: AnimationEventFunction;
  onFinalEnd?: AnimationEventFunction;
  onTransitionEnd?: AnimationEventFunction;
};

type Props = React.PropsWithChildren<StyledAnimatedProps>;

const Transition = React.forwardRef<TransitionHandle, Props>(
  (
    {
      children,
      delay,
      transition,
      onInitalEnd,
      onFinalEnd,
      onTransitionEnd,
      duration = '1s',
      timingFunction = 'linear',
      property = 'all',
      ...props
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(reducer, initialTransitionReducerState);

    const isRunning: TransitionHandle['isRunning'] = useCallback(
      () => state.transitionState === TransitionState.RUNNING,
      [state.transitionState]
    );
    const isFinished: TransitionHandle['isFinished'] = useCallback(
      () => state.transitionState === TransitionState.FINISHED,
      [state.transitionState]
    );

    const isInInitialState: TransitionHandle['isInInitialState'] = useCallback(
      () => state.componentState === ComponentState.INITIAL,
      [state.componentState]
    );
    const isInFinalState: TransitionHandle['isInFinalState'] = useCallback(
      () => state.componentState === ComponentState.FINAL,
      [state.componentState]
    );

    const reset: TransitionHandle['reset'] = useCallback(() => dispatch(resetAction()), []);

    const gotoInitialState: TransitionHandle['gotoInitialState'] = useCallback(
      () => dispatch(gotoInitialStateAction()),
      []
    );

    const gotoFinalState: TransitionHandle['gotoFinalState'] = useCallback(() => dispatch(gotoFinalStateAction()), []);

    const toggle: TransitionHandle['toggle'] = useCallback(() => dispatch(toggleAction()), []);

    useEffect(() => {
      if (isFinished()) {
        if (isInFinalState()) {
          onFinalEnd && onFinalEnd();
        } else {
          onInitalEnd && onInitalEnd();
        }
        onTransitionEnd && onTransitionEnd();
      }
    }, [isFinished, isInFinalState, onFinalEnd, onInitalEnd, onTransitionEnd]);

    useImperativeHandle(ref, () => ({
      state: state.transitionState,
      componentState: state.componentState,
      reset,
      toggle,
      gotoFinalState,
      gotoInitialState,
      isInInitialState,
      isInFinalState,
      isRunning,
      isFinished,
    }));

    const transitionCss = css`
      transition-property: ${property};
      transition-duration: ${duration};
      transition-delay: ${delay};
      transition-timing-function: ${timingFunction};
    `;

    return (
      <>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const className = `
          ${(props as any)?.className ?? ''}
          ${child.props.className ? child.props.className : ''} 
          ${transitionCss}
          ${transition?.initial ? transition?.initial : ''}
          ${isInFinalState() ? transition.final : ''}`;
            // passing all other props to be able to pass parentGap property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement<any>(child, {
              ...props,
              ...child.props,
              className,
              onTransitionEnd: (event?: React.TransitionEvent<unknown>) => {
                dispatch(finishAction());
                child.props.onTransitionEnd && child.props.onTransitionEnd(event);
              },
            });
          }
          return child;
        })}
      </>
    );
  }
);

Transition.displayName = 'Transition';

export default Transition;
