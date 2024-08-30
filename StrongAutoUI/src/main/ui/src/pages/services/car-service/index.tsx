import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import { BoxAnimation, Container, Image, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import ContactUs from 'pages/services/ContactUs';
import React from 'react';

const CarService: React.FC = () => {
  const t = useTranslation('services.carService');

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={CarServiceMechanicImage}>
        <BoxAnimation>
          <Title fontSize="3xl" title={t('header')} />
        </BoxAnimation>
      </PageHeader>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          padding: { left: 'md', right: 'md' },
          centered: true,
          direction: 'row',
          wrap: true,
          gap: '3rem',
        }}
        lgStyle={{ direction: 'row-reverse' }}
      >
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Title
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('title')}
              description={t('description')}
              gap="3rem"
            />
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Image src={CarServiceMechanicImage} objectFit="cover" rounded />
          </BoxAnimation>
        </Container>
      </Container>
      <ContactUs />
    </Container>
  );
};

export default CarService;
