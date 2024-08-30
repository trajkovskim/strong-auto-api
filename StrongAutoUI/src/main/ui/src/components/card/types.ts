import { Vehicle, VehicleState } from 'generated';

export type RibbonType = VehicleState;

export type ProductProps = {
  rating?: number;
  title: Vehicle['title'];
  summary?: Vehicle['summary'];
  amount: Vehicle['amount'];
  bookmarked?: boolean;
  images?: Vehicle['images'];
  onView?: () => void;
  inCart?: boolean;
  state?: Vehicle['state'];
  fullwidth?: boolean;
  mileage?: Vehicle['mileage'];
  fuelType?: Vehicle['fuelType'];
  year?: Vehicle['year'];
  transmission?: Vehicle['transmission'];
};
