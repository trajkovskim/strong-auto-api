import React, { useEffect, useRef } from 'react';

type Props = React.PropsWithChildren & {
  callback: () => void;
  threshold?: number;
};

const ElementIntersectionObserver: React.FC<Props> = ({ threshold = 0.2, ...props }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const intersectionObserverCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        props.callback();
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
    <div style={{ height: '100%', width: '100%' }} ref={elementRef}>
      {props.children}
    </div>
  );
};

export default ElementIntersectionObserver;
