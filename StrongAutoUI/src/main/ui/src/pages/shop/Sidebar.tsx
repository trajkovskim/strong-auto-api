import { Drawer } from 'antd';
import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type Props = React.ComponentProps<typeof Drawer>;

const StyledDrawer = styled(Drawer)`
  background-color: black;
`;

const Sidebar: React.FC<Props> = ({ ...props }) => {
  const portalsElement = document.getElementById('portals') as Element;

  return createPortal(<StyledDrawer {...props} />, portalsElement);
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
