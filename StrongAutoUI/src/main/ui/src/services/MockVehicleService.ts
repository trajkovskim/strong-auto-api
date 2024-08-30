import { Vehicle, VehicleApi, VehicleMake, VehicleMakeApi, VehicleMakesResponse, VehiclesResponse } from 'generated';
import { createMockResponse } from 'services/api';
import { makes, vehicles } from 'services/mocks';

export const MOCK_VEHICLE_API: VehicleApi = {
  searchVehicleEntries: (...[request]: Parameters<VehicleApi['searchVehicleEntries']>) => {
    // const { page, size } = request;
    const filters = { ...request.vehicleFilters };

    const mileageInterval = { from: filters.mileageFrom, to: filters.mileageTo };
    const yearInterval = { from: filters.yearFrom, to: filters.yearTo };
    const priceInterval = { from: filters.priceFrom, to: filters.priceTo };

    delete filters.mileageFrom;
    delete filters.mileageTo;
    delete filters.yearFrom;
    delete filters.yearFrom;
    delete filters.priceFrom;

    const filteredVehicles = vehicles.filter((vehicle) => {
      for (const key of Object.keys(filters)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filter = filters[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const v = vehicle[key] ?? vehicle[key.substring(0, key.length - 1)];

        if (!filter || (Array.isArray(filter) && filter.includes(v)) || filter === v) {
          continue;
        }

        return false;
      }

      const mileage = vehicle.mileage ?? 0;
      const year = vehicle.mileage ?? 0;
      const vehicleAmount = vehicle.amount.totalPromo ?? vehicle.amount.total;

      if (
        (mileageInterval.from && mileage < mileageInterval.from) ||
        (mileageInterval.to && mileage > mileageInterval.to) ||
        (yearInterval.from && year < yearInterval.from) ||
        (yearInterval.to && year > yearInterval.to) ||
        (priceInterval.from && vehicleAmount < priceInterval.from) ||
        (priceInterval.to && vehicleAmount > priceInterval.to)
      ) {
        return false;
      }

      return true;
    });

    return createMockResponse<VehiclesResponse>({ vehicles: filteredVehicles } as VehiclesResponse, 1500);
  },
  getVehicleEntry: (...[request]: Parameters<VehicleApi['getVehicleEntry']>) =>
    createMockResponse<Vehicle>(vehicles.find((vehicle) => vehicle.id === request.id) as Vehicle, 1500),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} as never;

export const MOCK_VEHICLE_MAKE_API: VehicleMakeApi = {
  getVehicleMakeEntries: (...[request]: Parameters<VehicleMakeApi['getVehicleMakeEntries']>) =>
    createMockResponse<VehicleMakesResponse>(
      {
        makes: makes.map((make) => ({
          make: make.make,
        })),
      },
      1500
    ),
  getVehicleMakeEntry: (...[request]: Parameters<VehicleMakeApi['getVehicleMakeEntry']>) =>
    createMockResponse<VehicleMake>(makes.find((make) => make.make === request.make) as VehicleMake, 1500),
} as never;
