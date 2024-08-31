import { VehicleFiltersForm } from 'context/vehicles';
import env from 'env';
import { SearchVehicleEntriesRequest, VehicleApi, VehicleFeaturesApi, VehicleMakeApi } from 'generated';
import { baseConfiguration } from 'services/api';
import { MOCK_VEHICLE_API, MOCK_VEHICLE_FEATURES_API, MOCK_VEHICLE_MAKE_API } from 'services/MockVehicleService';

const AXIOS_VEHICLE_API = new VehicleApi(baseConfiguration);

const VEHICLE_API = env.USE_MOCK === 'true' ? MOCK_VEHICLE_API : AXIOS_VEHICLE_API;

export const searchVehicles = ({
  vehicleFilters,
  sortBy,
  ...params
}: Omit<SearchVehicleEntriesRequest, 'vehicleFilters' | 'sortBy'> & {
  vehicleFilters: VehicleFiltersForm;
  sortBy?: string;
}) => {
  const priceSplit = vehicleFilters.price?.split('-');

  return VEHICLE_API.searchVehicleEntries({
    ...params,
    vehicleFilters: {
      ...vehicleFilters,
      priceFrom: priceSplit?.[0],
      priceTo: priceSplit?.[1] === 'any' ? undefined : priceSplit?.[1],
      features: vehicleFilters.features?.map((feature) => {
        const featureSplit = feature.split(':');

        return {
          groupKey: featureSplit?.[0],
          featureKey: featureSplit?.[1],
        };
      }),
    },
    sortBy: sortBy ? [sortBy] : undefined,
  });
};

export const getVehicleEntry = (...params: Parameters<typeof VEHICLE_API.getVehicleEntry>) =>
  VEHICLE_API.getVehicleEntry(...params);

const AXIOS_VEHICLE_MAKE_API = new VehicleMakeApi(baseConfiguration);

const VEHICLE_MAKE_API = env.USE_MOCK === 'true' ? MOCK_VEHICLE_MAKE_API : AXIOS_VEHICLE_MAKE_API;

export const getVehicleMakeEntries = (...params: Parameters<typeof VEHICLE_MAKE_API.getVehicleMakeEntries>) =>
  VEHICLE_MAKE_API.getVehicleMakeEntries(...params);

export const getVehicleMakeEntry = (...params: Parameters<typeof VEHICLE_MAKE_API.getVehicleMakeEntry>) =>
  VEHICLE_MAKE_API.getVehicleMakeEntry(...params);

const AXIOS_VEHICLE_FEATURES_API = new VehicleFeaturesApi(baseConfiguration);

const VEHICLE_FEATURES_API = env.USE_MOCK === 'true' ? MOCK_VEHICLE_FEATURES_API : AXIOS_VEHICLE_FEATURES_API;

export const getVehicleFeatureEntries = (...params: Parameters<typeof VEHICLE_FEATURES_API.getVehicleFeatureEntries>) =>
  VEHICLE_FEATURES_API.getVehicleFeatureEntries(...params);
