import StrongAutoApp from 'StrongAutoApp';
import { Layout } from 'components/layout';
import {
  AboutUs,
  CarService,
  Contact,
  DpfCleaningService,
  Home,
  NotFound,
  Parts,
  Shop,
  TowingService,
  ViewDetails,
} from 'pages';
import React from 'react';
import { Route } from 'react-router-dom';

export enum Routes {
  INDEX = '/',
  ANY_WITH_LAYOUT = '/',
  SHOP = '/shop',
  SHOP_VIEW_DETAILS = '/shop/:id',
  CONTACT = '/contact',
  ABOUT_US = '/about-us',
  TOWING_SERVICE = '/services/towing-service',
  CAR_SERVICE = '/services/car-service',
  DPF_CLEANING_SERVICE = '/services/dpf-cleaning-service',
  PARTS = '/parts',
  ANY_OTHER = '*',
}

export type RouteOption = Omit<React.ComponentProps<typeof Route>, 'children'> & {
  children?: Record<string, RouteOption>;
};

export type RouteOptions = Record<string, RouteOption>;

const routes: RouteOptions = {
  [Routes.INDEX]: {
    element: <StrongAutoApp />,
    children: {
      [Routes.ANY_WITH_LAYOUT]: {
        element: <Layout />,
        children: {
          [Routes.INDEX]: {
            element: <Home />,
          },
          [Routes.SHOP]: {
            element: <Shop />,
          },
          [Routes.SHOP_VIEW_DETAILS]: {
            element: <ViewDetails />,
          },
          [Routes.TOWING_SERVICE]: {
            element: <TowingService />,
          },
          [Routes.CAR_SERVICE]: {
            element: <CarService />,
          },
          [Routes.DPF_CLEANING_SERVICE]: {
            element: <DpfCleaningService />,
          },
          [Routes.CONTACT]: {
            element: <Contact />,
          },
          [Routes.ABOUT_US]: {
            element: <AboutUs />,
          },
          [Routes.PARTS]: {
            element: <Parts />,
          },
          [Routes.ANY_OTHER]: {
            element: <NotFound />,
          },
        },
      },
    },
  },
};

export default routes;
