import Container from 'components/common/Container';
import Image from 'components/common/Image';
import Card from 'components/common/card/Card';
import Text from 'components/common/typography/Text';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

const StyledCard = styled(Card)`
  transition: 200ms all;

  cursor: ${(props) => !!props.onClick && 'pointer'};

  &:hover {
    color: ${(props) => !!props.onClick && theme.serviceCard.hoverColor};
  }
`;

type Props = React.ComponentProps<typeof Container> & {
  image?: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

const ServiceCard: React.FC<Props> = (props) => {
  const body = (
    <Container xs={12} styleConfig={{ gap: '1rem', padding: { top: 'lg' } }}>
      <Text fontSize="2xl" bold>
        {props.title}
      </Text>
      <Text fontSize="lg">{props.description}</Text>
    </Container>
  );

  const image = <Image src={props.image} objectFit="cover" height="250px" />;

  return <StyledCard body={body} image={image} onClick={props.onClick} />;
};

export default ServiceCard;
