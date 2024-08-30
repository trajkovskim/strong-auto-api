import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import MasserattiMountainsImage from 'assets/masseratti-mountains.jpg';

import Services from 'components/Services';
import { BoxAnimation, Button, Carousel, Container, Image, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { WhiteBackgroundContainer } from 'pages/common.styled';
import BuyingACar from 'pages/home/BuyingACar';
import FAQ from 'pages/home/Faq';
import NewsLetterSubscription from 'pages/home/NewsLetterSubscription';
import PopularMakes from 'pages/home/PopularMakes';
import ProductsSection from 'pages/home/ProductsSection';
import Reviews from 'pages/home/Reviews';
import SearchBox from 'pages/home/SearchBox';
import WhyChooseUs from 'pages/home/WhyChooseUs';
import { CarouselWrapper } from 'pages/home/index.styled';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const secondElement = useRef<HTMLDivElement>(null);
  const t = useTranslation('home');

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <CarouselWrapper styleConfig={{ minHeight: '800px', maxHeight: '100dvh' }}>
        <Carousel absolute minHeight="800px" maxHeight="100dvh" noChangeOptions noArrows>
          <Image src={BMWDriftSoilImage} objectFit="cover" objectPosition="center" height="100%" />
          <Image src={MasserattiMountainsImage} objectFit="cover" objectPosition="center" height="100%" />
        </Carousel>
        <Container styleConfig={{ gap: '3rem', padding: { top: 'xl', bottom: 'xl', left: 'md', right: 'md' } }}>
          <BoxAnimation>
            <Container xs="600px" styleConfig={{ centered: true, itemsCentered: true }}>
              <Title
                fontSize={{ title: '3xl', description: 'xl' }}
                bold
                title={t('carousel.title')}
                centered
                gap="2rem"
                description={t('carousel.description')}
              />
            </Container>
          </BoxAnimation>
          <BoxAnimation>
            <Container
              xs="600px"
              styleConfig={{ gap: '1rem', centered: true, itemsCentered: true }}
              smStyle={{ direction: 'row' }}
            >
              <Button maxContent size="lg" onClick={() => navigate(Routes.SHOP)}>
                {t('carousel.inventoryButton')}
              </Button>
              <Button
                maxContent
                size="lg"
                themeType="ghost"
                onClick={() => scrollTo({ top: (secondElement.current?.offsetTop ?? 0) - 100, behavior: 'smooth' })}
              >
                {t('carousel.scrollDownButton')}
              </Button>
            </Container>
          </BoxAnimation>
        </Container>
      </CarouselWrapper>

      <WhiteBackgroundContainer ref={secondElement}>
        <BoxAnimation>
          <SearchBox />
        </BoxAnimation>
      </WhiteBackgroundContainer>

      <ProductsSection />

      <BuyingACar />

      <PopularMakes />

      <Services />
      {/* <CantFindVehicle /> */}
      {/* <CarLot /> */}

      <WhyChooseUs />
      <Reviews />
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <NewsLetterSubscription />
        </BoxAnimation>
      </WhiteBackgroundContainer>
      <WhiteBackgroundContainer>
        <BoxAnimation>
          <FAQ />
        </BoxAnimation>
      </WhiteBackgroundContainer>
    </Container>
  );
};

export default Home;
