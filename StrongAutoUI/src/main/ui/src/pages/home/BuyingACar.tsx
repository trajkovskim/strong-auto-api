import RentCarImage from 'assets/rent-car-image.jpg';
import { BoxAnimation, Button, Container, Image, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const StyledBuyCarImage = styled(Image)`
  border-bottom-right-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const StyledRightImage = styled(Image)`
  border-bottom-left-radius: 150px;
  border-top-left-radius: 150px;
  box-shadow: 0px 35px 5px -17px #a3a3a3, 18px 57px 16px -17px #b8b8b8;
  /* clip-path: ellipse(67% 75% at 75% 66%); */

  height: 100%;
  max-height: 600px;
  min-height: 400px;
`;

const BuyingACar: React.FC = () => {
  const navigate = useNavigate();
  const tbuyingACar = useTranslation('home.buyingACar');
  const tRentingACar = useTranslation('home.rentingACar');

  return (
    // <Container xs={12} styleConfig={{ padding: { top: 'xl', bottom: '2xl' }, gap: '2rem' }}>
    <>
      <BoxAnimation>
        <Container
          styleConfig={{
            direction: 'row',
            wrap: true,
            minHeight: '530px',
            padding: { bottom: 'lg', right: 'md', left: 'md' },
            gap: '3.5rem',
          }}
          lgStyle={{ textAlign: 'right' }}
        >
          <Container xs={12} lg={5} xl={5} styleConfig={{ gap: '1rem' }} lgStyle={{ order: 2, alignItems: 'end' }}>
            <Title fontSize="2xl" bold title={tbuyingACar('title')} />
            <Text fontSize="lg">{tbuyingACar('description')}</Text>
            <Button
              size="xl"
              iconRight={<HiArrowRight />}
              maxContent
              themeType="link"
              onClick={() => navigate(Routes.SHOP)}
            >
              {tbuyingACar('visitButton')}
            </Button>
          </Container>
          <Container xs={12} lg={7} xl={5.5} lgStyle={{ order: 1 }}>
            <StyledBuyCarImage height="500px" objectFit="cover" shadow src={RentCarImage} />
          </Container>
        </Container>
      </BoxAnimation>
      <BoxAnimation threshold={0.2}>
        <Container
          styleConfig={{
            justifyContent: 'flex-end',
            direction: 'row',
            wrap: true,
            minHeight: '530px',
            padding: { bottom: 'lg', right: 'md', left: 'md' },
            gap: '3.5rem',
          }}
        >
          <Container xs={12} lg={5} xl={5} styleConfig={{ gap: '1rem' }}>
            <Title fontSize="2xl" bold title={tRentingACar('title')} />
            <Text fontSize="lg">{tRentingACar('description')}</Text>
            <Button
              size="xl"
              iconRight={<HiArrowRight />}
              maxContent
              themeType="link"
              onClick={() => navigate(Routes.SHOP)}
            >
              {tRentingACar('visitButton')}
            </Button>
          </Container>
          <Container xs={12} lg={7} xl={5.5}>
            <StyledRightImage objectFit="cover" shadow src={RentCarImage} />
          </Container>
        </Container>
      </BoxAnimation>
    </>
    // </Container>
  );
};

export default BuyingACar;
