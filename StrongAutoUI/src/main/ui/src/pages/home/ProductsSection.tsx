import { ProductCard } from 'components/card';
import { BoxAnimation, ButtonProps, ButtonsGroup, Container, HorizontalList, StyledSpinner } from 'components/common';
import { VehiclesResponse, VehicleState } from 'generated';
import { useLanguage, useRequest, useTranslation } from 'hooks';
import { WhiteBackgroundContainer } from 'pages/common.styled';
import BodyTypes from 'pages/home/BodyTypes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';

const ProductsSection: React.FC = () => {
  const t = useTranslation('home.vehiclesSection');
  const tabs: ButtonProps[] = [
    {
      label: t('featured'),
      value: 'featured',
    },
    {
      label: t('bodyTypes'),
      value: 'bodyTypes',
    },
  ];

  const navigate = useNavigate();
  const [exploreVehiclesActiveTab, setExploreVehiclesActiveTab] = useState<string>(tabs[0].value);
  const { send, loading } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const { language } = useLanguage();

  useEffect(() => {
    send(
      searchVehicles({
        vehicleFilters: { states: [VehicleState.Featured] },
        page: 0,
        size: 15,
        acceptLanguage: language,
      }).then(setVehiclesResponse)
    );
  }, [language, send]);

  if (loading) {
    return <StyledSpinner centered />;
  }

  return (
    <WhiteBackgroundContainer
      xs={12}
      styleConfig={{ gap: '3rem', centered: true, padding: { left: 'md', right: 'md' } }}
    >
      <BoxAnimation>
        <Container styleConfig={{ alignItems: 'center' }}>
          <ButtonsGroup
            buttons={tabs}
            onChange={(tab) => setExploreVehiclesActiveTab(tab.value)}
            active={exploreVehiclesActiveTab}
          />
        </Container>
      </BoxAnimation>

      {exploreVehiclesActiveTab === tabs[0].value && (
        <BoxAnimation>
          <HorizontalList gap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            {vehiclesResponse?.vehicles.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
              />
            ))}
          </HorizontalList>
        </BoxAnimation>
      )}
      <BoxAnimation>{exploreVehiclesActiveTab === tabs[1].value && <BodyTypes />}</BoxAnimation>
    </WhiteBackgroundContainer>
  );
};

export default ProductsSection;
