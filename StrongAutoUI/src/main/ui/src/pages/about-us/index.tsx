/* eslint-disable max-len */
import AudiHeadlightsImage from 'assets/audi-headlights.jpg';
import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import { BoxAnimation, Container, Image, Line, List, Text, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import Services from 'components/Services';
import FAQ from 'pages/home/Faq';
import Reviews from 'pages/home/Reviews';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import React from 'react';
import styled from 'styled-components';
import { PAGE_MAX_WIDTH } from 'pages/constants';

const WelcomeIntroWrapper = styled(Container)`
  /* background-color: #232323;
  color: white; */
`;

const WelcomeIntroImage = styled(Image)`
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;

  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const AboutUs: React.FC = () => {
  const t = useTranslation('aboutUs');

  return (
    <Container styleConfig={{ gap: '4rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={AudiHeadlightsImage}>
        <Title fontSize="3xl" title={t('title')} />
      </PageHeader>
      <WelcomeIntroWrapper
        xs={12}
        styleConfig={{
          centered: true,
          direction: 'row',
          justifyContent: 'end',
          wrap: true,
          gap: '3rem',
          padding: { left: 'md', right: 'md' },
        }}
      >
        <Container xs={12} lg={6} xl={5} styleConfig={{ gap: '2rem' }}>
          <BoxAnimation>
            <Title
              gap="2rem"
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('whoWeAre.title')}
              description={t('whoWeAre.description')}
            />
          </BoxAnimation>
          <BoxAnimation>
            <Title
              gap="2rem"
              fontSize={{ title: 'lg', description: 'lg' }}
              title={t('ourMission.title')}
              description={t('ourMission.description')}
            />
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={6} xl={5.7}>
          <BoxAnimation>
            <WelcomeIntroImage shadow src={BMWDriftSoilImage} objectFit="cover" height="100%" />
          </BoxAnimation>
        </Container>
      </WelcomeIntroWrapper>
      <Container styleConfig={{ gap: '1rem' }}>
        <Line />
        <Container xs={PAGE_MAX_WIDTH} styleConfig={{ centered: true }}>
          <BoxAnimation>
            <List xs={2} md={4} justifyContent="center" gap="1rem">
              <Container styleConfig={{ padding: 'md', rounded: true }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container styleConfig={{ padding: 'md' }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
              <Container styleConfig={{ padding: 'md' }}>
                <Text fontSize="2xl" bold>
                  10+
                </Text>
                <Text fontSize="lg">Years</Text>
              </Container>
            </List>
          </BoxAnimation>
        </Container>
      </Container>
      <Services />
      <WhyChooseUs />
      <Reviews />
      <FAQ />
    </Container>
  );
};

export default AboutUs;
