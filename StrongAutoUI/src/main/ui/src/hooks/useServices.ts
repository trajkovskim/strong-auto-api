import TowTruckImage from 'assets/tow-truck.jpg';
import CarServiceMechanicImage from 'assets/car-service-mechanic.jpg';
import DpfCleaningImage from 'assets/dpf-cleaning.jpg';
import useTranslation from 'hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const useServices = () => {
  const navigate = useNavigate();
  const t = useTranslation('services.cards');

  return [
    {
      title: t('0.title'),
      description: t('0.description'),
      image: TowTruckImage,
      onClick: () => navigate(Routes.TOWING_SERVICE),
    },
    {
      title: t('1.title'),
      description: t('1.description'),
      image: DpfCleaningImage,
      onClick: () => navigate(Routes.DPF_CLEANING_SERVICE),
    },
    {
      title: t('2.title'),
      description: t('2.description'),
      image: CarServiceMechanicImage,
      onClick: () => navigate(Routes.CAR_SERVICE),
    },
  ];
};

export default useServices;
