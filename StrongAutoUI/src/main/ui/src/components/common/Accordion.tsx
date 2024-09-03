import { Collapse as CollapseAntd } from 'antd';
import Button from 'components/common/Button';
import React from 'react';
import styled from 'styled-components';

type Props = React.PropsWithChildren &
  React.ComponentProps<typeof CollapseAntd> & {
    buttonProps?: React.ComponentProps<typeof Button>;
    header: React.ReactNode;
    defaultState?: 'open' | 'closed';
    onOpen?: () => void;
    onClose?: () => void;
  };

const StyledCollapse = styled(CollapseAntd)`
  > .ant-collapse-item {
    > .ant-collapse-header {
      padding: 0;
    }

    .ant-collapse-header > .ant-collapse-header-text {
      line-height: 0;
    }

    > .ant-collapse-header > .ant-collapse-expand-icon {
      padding: 0 !important;
      padding-inline-end: 12px !important;
    }

    > .ant-collapse-content > * {
      padding: 0 !important;
    }
  }
`;

const Accordion = React.forwardRef<HTMLDivElement, Props>(
  ({ defaultState = 'closed', buttonProps, header, ...props }, ref) => {
    return (
      <StyledCollapse
        ref={ref}
        {...props}
        defaultActiveKey={defaultState === 'open' ? '1' : undefined}
        expandIconPosition="end"
        ghost
        items={[
          {
            key: '1',
            label: (
              <Button themeType="link" size="lg" maxContent {...buttonProps}>
                {header}
              </Button>
            ),
            children: props.children,
          },
        ]}
      />
    );
  }
);

Accordion.displayName = 'Accordion';

export default Accordion;
