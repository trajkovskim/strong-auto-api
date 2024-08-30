import Container from 'components/common/Container';
import Text from 'components/common/typography/Text';
import { useTranslation } from 'hooks';
import React from 'react';
import styled from 'styled-components';

type StyledRibbonProps = Omit<RibbonProps, 'label'>;
const StyledRibbon = styled(Container)<StyledRibbonProps>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  user-select: none;
`;

export type RibbonProps = {
  label?: string;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

type Props = RibbonProps & {
  className?: string;
};

const Ribbon: React.FC<Props> = ({ className, ...props }) => {
  const t = useTranslation();
  return (
    <StyledRibbon
      className={className}
      styleConfig={{
        rounded: true,
        padding: { left: 'md', right: 'md', top: 'xs', bottom: 'xs' },
        justifyContent: 'center',
      }}
      background={props.background}
      color={props.color}
      xs="max-content"
    >
      {props.label && (
        <Text bold fontSize="sm">
          {t(props.label)}
        </Text>
      )}
    </StyledRibbon>
  );
};

export default Ribbon;
