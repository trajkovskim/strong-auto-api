import { HorizontalList } from 'components/common';
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
  const { state, dispatch } = useApplicationContext();
  const filters = state.vehicles.filters;

  const handleClick = (bodyType: VehicleBodyType) => {
    dispatch(setVehicleFiltersAction({ ...filters, bodyTypes: [bodyType] }));
    navigate(Routes.SHOP);
  };

  return (
    <HorizontalList chunkSize={{ xs: 1, sm: 2, lg: 3, xl: 4 }} rows={2} slidesToScroll={4} slidesToShow={4}>
      {bodyTypes.map((bodyType) => (
        <BodyTypeTile key={bodyType.bodyType} {...bodyType} onClick={() => handleClick(bodyType.bodyType)} />
      ))}
    </HorizontalList>
  );
};

export default BodyTypes;
