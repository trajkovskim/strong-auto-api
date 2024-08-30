import TowTruckImage from 'assets/tow-truck.jpg';
import { BoxAnimation, Container, Image, List, Text, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import { DarkBackgroundContainer } from 'pages/common.styled';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import { createList } from 'pages/services/common';
import ContactUs from 'pages/services/ContactUs';
import React from 'react';
import { createMatrixFromTranslations } from 'utils';

const TowingService: React.FC = () => {
  const t = useTranslation('services.towingService');

  const whyChooseOurTowingServices = createMatrixFromTranslations('whyChooseOurTowingServices', t).map(
    (list, index) => (
      <Container key={index} styleConfig={{ gap: '1rem' }}>
        <Text bold fontSize="lg">
          {list.title}
        </Text>
        {createList(
          list.items.map((item, index) => (
            <Text key={index} fontSize="md">
              {item}
            </Text>
          ))
        )}
      </Container>
    )
  );

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={TowTruckImage}>
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
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
        </Container>
      </Container>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          padding: { left: 'md', right: 'md' },
          centered: true,
        }}
      >
        <List xs={1} sm={2} md={3} lg={4} gap="3rem">
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
          <BoxAnimation>
            <Image src={TowTruckImage} objectFit="cover" rounded />
          </BoxAnimation>
        </List>
      </Container>
      <DarkBackgroundContainer xs={12}>
        <Container
          xs={PAGE_MAX_WIDTH}
          styleConfig={{ padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' }, centered: true, gap: '3rem' }}
          lgStyle={{ padding: { top: 'xl', bottom: '2xl' } }}
        >
          <BoxAnimation>
            <Title title={t('whyChooseOurTowingServices.title')} fontSize="2xl" />
          </BoxAnimation>
          <List xs={1} sm={2} md={3} gap="3rem">
            {whyChooseOurTowingServices}
          </List>
        </Container>
      </DarkBackgroundContainer>
      <ContactUs />
    </Container>
  );
};

export default TowingService;
