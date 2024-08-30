import CarLot from 'assets/car-lot.jpg';
import { BoxAnimation, Container, Icon, Image, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { DarkBackgroundContainer } from 'pages/common.styled';
import React from 'react';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import styled from 'styled-components';

const StyledIcon = styled(Icon)`
  width: max-content;
`;

const StyledCarLotImage = styled(Image)`
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;

  height: 100%;
  min-height: 400px;
`;

const WhyChooseUs: React.FC = () => {
  const t = useTranslation('home.whyChooseUs');

  return (
    <DarkBackgroundContainer>
      <BoxAnimation>
        <Container
          styleConfig={{
            minHeight: '430px',
            padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' },
            gap: '3rem',
            direction: 'row',
            wrap: true,
            justifyContent: 'end',
          }}
          lgStyle={{ padding: { top: '2xl', bottom: '2xl', left: 'md', right: 'md' } }}
        >
          <Container xs={12} lg={5} xl={4.5} styleConfig={{ gap: '2rem' }}>
            <Title
              title={t('title')}
              description={t('description')}
              gap="1rem"
              fontSize={{ title: 'xl', description: 'lg' }}
            />
            <BoxAnimation>
              <Container styleConfig={{ gap: '2rem', direction: 'row' }}>
                <Container xs="max-content">
                  <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
                </Container>
                <Container styleConfig={{ gap: '1rem' }}>
                  <Text bold fontSize="lg">
                    {t('point1.title')}
                  </Text>
                  <Text fontSize="md">{t('point1.description')}</Text>
                </Container>
              </Container>
            </BoxAnimation>
            <BoxAnimation>
              <Container styleConfig={{ gap: '2rem', direction: 'row' }}>
                <Container xs="max-content">
                  <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
                </Container>
                <Container styleConfig={{ gap: '1rem' }}>
                  <Text bold fontSize="lg">
                    {t('point2.title')}
                  </Text>
                  <Text fontSize="md">{t('point2.description')}</Text>
                </Container>
              </Container>
            </BoxAnimation>
            <BoxAnimation>
              <Container styleConfig={{ gap: '2rem', direction: 'row' }}>
                <Container xs="max-content">
                  <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
                </Container>
                <Container styleConfig={{ gap: '1rem' }}>
                  <Text bold fontSize="lg">
                    {t('point3.title')}
                  </Text>
                  <Text fontSize="md">{t('point3.description')}</Text>
                </Container>
              </Container>
            </BoxAnimation>
            <BoxAnimation>
              <Container styleConfig={{ gap: '2rem', direction: 'row' }}>
                <Container xs="max-content">
                  <StyledIcon size="xl" icon={<VscWorkspaceTrusted />} />
                </Container>
                <Container styleConfig={{ gap: '1rem' }}>
                  <Text bold fontSize="lg">
                    {t('point3.title')}
                  </Text>
                  <Text fontSize="md">{t('point3.description')}</Text>
                </Container>
              </Container>
            </BoxAnimation>
          </Container>
          <Container xs={12} lg={7} xl={6}>
            <BoxAnimation fullheight>
              <StyledCarLotImage src={CarLot} height="100%" width="100%" objectFit="cover" />
            </BoxAnimation>
          </Container>
        </Container>
      </BoxAnimation>
    </DarkBackgroundContainer>
  );
};

export default WhyChooseUs;
