import { useTranslation } from 'hooks';
import React from 'react';
import { FaCar, FaHome, FaInfoCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

export type NavigationOption = {
  label: string;
  navigate?: () => void;
  active: boolean;
  icon?: React.ReactElement;
  options?: Record<string, NavigationOption>;
};

const useNavigationOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslation('nav');

  const options: Record<string, NavigationOption> = {
    [Routes.INDEX]: {
      label: t('home'),
      navigate: () => navigate(Routes.INDEX),
      active: location.pathname === Routes.INDEX,
      icon: React.createElement(FaHome),
    },
    [Routes.SHOP]: {
      label: t('shop'),
      navigate: () => navigate(Routes.SHOP, { state: { resetFilters: true } }),
      active: location.pathname === Routes.SHOP,
      icon: React.createElement(FaCar),
    },
    ['Services']: {
      label: t('services'),
      active:
        location.pathname === Routes.TOWING_SERVICE ||
        location.pathname === Routes.CAR_SERVICE ||
        location.pathname === Routes.DPF_CLEANING_SERVICE,
      icon: React.createElement(FaGear),
      options: {
        [Routes.TOWING_SERVICE]: {
          label: t('towingService'),
          active: location.pathname === Routes.TOWING_SERVICE,
          navigate: () => navigate(Routes.TOWING_SERVICE),
        },
        [Routes.CAR_SERVICE]: {
          label: t('carService'),
          active: location.pathname === Routes.CAR_SERVICE,
          navigate: () => navigate(Routes.CAR_SERVICE),
        },
        [Routes.DPF_CLEANING_SERVICE]: {
          label: t('dpfCleaningService'),
          active: location.pathname === Routes.DPF_CLEANING_SERVICE,
          navigate: () => navigate(Routes.DPF_CLEANING_SERVICE),
        },
      },
    },
    [Routes.ABOUT_US]: {
      label: t('aboutUs'),
      navigate: () => navigate(Routes.ABOUT_US),
      active: location.pathname === Routes.ABOUT_US,
      icon: React.createElement(FaInfoCircle),
    },
    [Routes.CONTACT]: {
      label: t('contact'),
      navigate: () => navigate(Routes.CONTACT),
      active: location.pathname === Routes.CONTACT,
      icon: React.createElement(MdOutlinePhoneIphone),
    },
  };

  return options;
};
export default useNavigationOptions;
