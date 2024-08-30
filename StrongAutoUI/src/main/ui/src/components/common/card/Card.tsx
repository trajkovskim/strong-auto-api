import Container from 'components/common/Container';
import React from 'react';
import styled from 'styled-components';

type StyledCardProps = {
  fullwidth?: boolean;
};

const StyledCard = styled(Container)<StyledCardProps>`
  box-sizing: border-box;

  height: 100%;
  max-width: ${(props) => props.fullwidth && '100%'};

  cursor: ${(props) => !!props.onClick && 'pointer'};

  overflow: hidden;
  border-radius: 5px;
`;

type Props = StyledCardProps & {
  footer?: React.ReactNode;
  image?: React.ReactNode;
  onImageContainer?: React.ReactNode;
  body?: React.ReactNode;
} & React.ComponentProps<typeof Container>;

const Card: React.FC<Props> = ({ footer, image, onImageContainer, body, ...props }) => {
  return (
    <StyledCard {...props} fullwidth={props.fullwidth} styleConfig={{ alignItems: 'stretch', ...props.styleConfig }}>
      <Container xs={12} styleConfig={{ relative: true }}>
        {image}
        {onImageContainer}
      </Container>
      {body && <Container xs={12}>{body}</Container>}
      {footer && <Container xs={12}>{footer}</Container>}
    </StyledCard>
  );
};

export default Card;
