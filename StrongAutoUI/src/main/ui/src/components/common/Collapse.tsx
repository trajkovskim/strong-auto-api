import { Collapse as CollapseAntd } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';

type StyledCollapseProps = {
  gap?: React.CSSProperties['gap'];
  linesBetween?: boolean;
};

const StyledCollapse = styled(CollapseAntd)<StyledCollapseProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};

  ${(props) =>
    props.linesBetween &&
    css`
      & > .ant-collapse-item::after {
        content: '';
        display: block;
        width: 100%;
        border-bottom: 1px solid var(--border-line-color);
        border-image: linear-gradient(to right, black 0%, #ccc 50%, transparent 100%) 1;
        padding-top: ${props.gap};
      }
    `}

  & > .ant-collapse-item {
    > .ant-collapse-header {
      align-items: center;
      padding: 0;
    }

    > .ant-collapse-content > * {
      padding: 0;
    }
  }
`;

type Props = React.ComponentProps<typeof CollapseAntd> & StyledCollapseProps;

const Collapse = React.forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => {
  return <StyledCollapse ref={ref} expandIconPosition="end" ghost {...props} />;
});

Collapse.displayName = 'Collapse';

export default Collapse;
