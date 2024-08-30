import { BoxAnimation, Container, List, ServiceCard, Title } from 'components/common';
import { useTranslation } from 'hooks';
import useServices from 'hooks/useServices';
import { WhiteBackgroundContainer } from 'pages/common.styled';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';

const Services: React.FC = () => {
  const t = useTranslation('services');
  const services = useServices();

  return (
    <WhiteBackgroundContainer>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          centered: true,
          itemsCentered: true,
          padding: { left: 'md', right: 'md' },
        }}
      >
        <List xs={1} md={2} gap="4rem" justifyContent="center" elementWidth="1fr">
          <BoxAnimation>
            <Container styleConfig={{ gap: '3rem' }}>
              <Title
                title={t('introCard.title')}
                fontSize={{ title: 'xl', description: 'lg' }}
                description={t('introCard.description')}
                gap="2rem"
              />
            </Container>
          </BoxAnimation>
          {services.map((card, index) => (
            <BoxAnimation key={index}>
              <ServiceCard {...card} />
            </BoxAnimation>
          ))}
        </List>
      </Container>
    </WhiteBackgroundContainer>
  );
};

export default Services;
