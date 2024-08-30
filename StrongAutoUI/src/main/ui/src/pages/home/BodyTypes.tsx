import { Container, HorizontalList } from 'components/common';
import { setVehicleFiltersAction } from 'context/vehicles';
import { VehicleBodyType } from 'generated';
import { useApplicationContext } from 'hooks';
import { bodyTypes } from 'pages/constants';
import BodyTypeTile from 'pages/home/BodyTypeTile';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const BodyTypes: React.FC = () => {
  const navigate = useNavigate();
  const { getState, dispatch } = useApplicationContext();
  const filters = getState().vehicles.filters;

  const handleClick = (bodyType: VehicleBodyType) => {
    dispatch(setVehicleFiltersAction({ ...filters, bodyTypes: [bodyType] }));
    navigate(Routes.SHOP);
  };

  return (
    <HorizontalList chunkGap="1rem" chunkSize={{ xs: '300px' }}>
      {new Array(Math.floor(bodyTypes.length / 2)).fill(0).map((_, index) => {
        const bodyType1 = bodyTypes[2 * index];
        const bodyType2 = bodyTypes[2 * index + 1];
        return (
          <Container key={`${bodyType1.id}_${bodyType2.id}`} styleConfig={{ gap: '1rem' }}>
            <BodyTypeTile {...bodyType1} onClick={() => handleClick(bodyType1.bodyType)} />
            <BodyTypeTile {...bodyType2} onClick={() => handleClick(bodyType2.bodyType)} />
          </Container>
        );
      })}
      {!!(bodyTypes.length % 2) && (
        <Container>
          <BodyTypeTile
            {...bodyTypes[bodyTypes.length - 1]}
            onClick={() => handleClick(bodyTypes[bodyTypes.length - 1].bodyType)}
          />
        </Container>
      )}
    </HorizontalList>
  );
};

export default BodyTypes;
