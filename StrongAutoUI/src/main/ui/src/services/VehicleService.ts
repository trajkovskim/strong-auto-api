import { VehicleFiltersForm } from 'context/vehicles';
import { SearchVehicleEntriesRequest, VehicleApi, VehicleFeaturesApi, VehicleMakeApi } from 'generated';
import { baseConfiguration } from 'services/api';

const VEHICLE_API = new VehicleApi(baseConfiguration);

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

export const getVehicleImageEntries = (...params: Parameters<typeof VEHICLE_API.getVehicleImageEntries>) =>
  VEHICLE_API.getVehicleImageEntries(...params);

export const getVehicleImageEntry = (...params: Parameters<typeof VEHICLE_API.getVehicleImageEntry>) =>
  VEHICLE_API.getVehicleImageEntry(...params);

const VEHICLE_MAKE_API = new VehicleMakeApi(baseConfiguration);

export const getVehicleMakeEntries = (...params: Parameters<typeof VEHICLE_MAKE_API.getVehicleMakeEntries>) =>
  VEHICLE_MAKE_API.getVehicleMakeEntries(...params);

export const getVehicleMakeEntry = (...params: Parameters<typeof VEHICLE_MAKE_API.getVehicleMakeEntry>) =>
  VEHICLE_MAKE_API.getVehicleMakeEntry(...params);

const VEHICLE_FEATURES_API = new VehicleFeaturesApi(baseConfiguration);

export const getVehicleFeatureEntries = (...params: Parameters<typeof VEHICLE_FEATURES_API.getVehicleFeatureEntries>) =>
  VEHICLE_FEATURES_API.getVehicleFeatureEntries(...params);
