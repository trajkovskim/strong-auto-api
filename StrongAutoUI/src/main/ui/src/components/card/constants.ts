import { RibbonProps } from 'components/common/card/Ribbon';
import type { RibbonType } from 'components/card/types';
import { VehicleState } from 'generated';

export const ribbons: Record<RibbonType, RibbonProps> = {
  [VehicleState.Sold]: {
    background: 'linear-gradient(#f14f3f 0, #cb4335 100%)',
    color: '#fff',
    label: 'strongauto.vehicleState.SOLD',
  },
  [VehicleState.Featured]: {
    background: 'linear-gradient(#54f13f 0, #5fcb35 100%)',
    color: '#fff',
    label: 'strongauto.vehicleState.FEATURED',
  },
};
