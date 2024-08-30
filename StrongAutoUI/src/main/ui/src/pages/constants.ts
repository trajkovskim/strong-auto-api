/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import SUVBodyTypeImage from 'assets/SUV.png';
import { VehicleBodyType } from 'generated';

export const PAGE_MAX_WIDTH = "1400px";

export const TELEPHONE = 'strongauto.telephone';
export const EMAIL = 'strongauto.email';
export const OPEN_HOURS = 'strongauto.openHours';

export const priceOptions = ['0-3000', '3000-10000','10000-20000','20000-50000','100000-any']

type BodyType = {
  id: number;
  bodyType: VehicleBodyType;
  inStock: number;
  label: string;
  imageSrc: string;
}

export const bodyTypes: BodyType[] = [
  { id: 0, bodyType: VehicleBodyType.Suv, inStock: 24, label: 'strongauto.vehicleBodyType.SUV', imageSrc: SUVBodyTypeImage },
  { id: 1, bodyType: VehicleBodyType.Sedan, inStock: 24, label: 'strongauto.vehicleBodyType.SEDAN', imageSrc: SUVBodyTypeImage },
  { id: 2, bodyType: VehicleBodyType.Convertible, inStock: 24, label: 'strongauto.vehicleBodyType.CONVERTIBLE', imageSrc: SUVBodyTypeImage },
  { id: 3, bodyType: VehicleBodyType.Limousine, inStock: 24, label: 'strongauto.vehicleBodyType.LIMOUSINE', imageSrc: SUVBodyTypeImage },
  { id: 4, bodyType: VehicleBodyType.Suv, inStock: 24, label: 'strongauto.vehicleBodyType.SUV', imageSrc: SUVBodyTypeImage },
  { id: 5, bodyType: VehicleBodyType.Sedan, inStock: 24, label: 'strongauto.vehicleBodyType.SEDAN', imageSrc: SUVBodyTypeImage },
  { id: 6, bodyType: VehicleBodyType.Convertible, inStock: 24, label: 'strongauto.vehicleBodyType.CONVERTIBLE', imageSrc: SUVBodyTypeImage },
  { id: 7, bodyType: VehicleBodyType.Limousine, inStock: 24, label: 'strongauto.vehicleBodyType.LIMOUSINE', imageSrc: SUVBodyTypeImage },
  { id: 8, bodyType: VehicleBodyType.Suv, inStock: 24, label: 'strongauto.vehicleBodyType.SUV', imageSrc: SUVBodyTypeImage },
  { id: 9, bodyType: VehicleBodyType.Sedan, inStock: 24, label: 'strongauto.vehicleBodyType.SEDAN', imageSrc: SUVBodyTypeImage },
  { id: 10, bodyType: VehicleBodyType.Convertible, inStock: 24, label: 'strongauto.vehicleBodyType.CONVERTIBLE', imageSrc: SUVBodyTypeImage },
  { id: 11, bodyType: VehicleBodyType.Limousine, inStock: 24, label: 'strongauto.vehicleBodyType.LIMOUSINE', imageSrc: SUVBodyTypeImage },
  { id: 12, bodyType: VehicleBodyType.Coupe, inStock: 24, label: 'strongauto.vehicleBodyType.LIMOUSINE', imageSrc: SUVBodyTypeImage },
];

export const faqQuestions = [
  {
    id: 0,
    question: 'strongauto.home.generalFaq.questions.0.question',
    answer: 'strongauto.home.generalFaq.questions.0.answer',
  },
  {
    id: 1,
    question: 'strongauto.home.generalFaq.questions.1.question',
    answer: 'strongauto.home.generalFaq.questions.1.answer',
  },
  {
    id: 2,
    question: 'strongauto.home.generalFaq.questions.2.question',
    answer: 'strongauto.home.generalFaq.questions.2.answer',
  },
  {
    id: 3,
    question: 'strongauto.home.generalFaq.questions.3.question',
    answer: 'strongauto.home.generalFaq.questions.3.answer',
  },
  {
    id: 4,
    question: 'strongauto.home.generalFaq.questions.4.question',
    answer: 'strongauto.home.generalFaq.questions.4.answer',
  },
];

export const reviews = [
  {
    id: 0,
    username: 'userName 1',
    creationDate: new Date(),
    rating: 4.5,
    comment: undefined,
    platform: 'Google',
  },
  {
    id: 1,
    username: 'userName 2',
    creationDate: new Date(),
    rating: 4,
    comment: undefined,
    platform: 'Google',
  },
];

// export const blogPosts = [
//   {
//     id: 0,
//     title: 'Blog title 1',
//     creationDate: new Date(),
//     markdown: undefined,
//     summary:
//       // eslint-disable-next-line max-len
//       'Blog 1 Blog Blog Blog Blog Blog Blog Blog Blog',
//     links: {
//       prev: '',
//       self: '',
//       next: '',
//     },
//   },
//   {
//     id: 1,
//     title: 'Blog title 2',
//     creationDate: new Date(),
//     summary:
//       // eslint-disable-next-line max-len
//       'Blog 2 Blog Blog Blog Blog Blog Blog Blog Blog',
//   },
//   {
//     id: 2,
//     title: 'Blog title 3',
//     creationDate: new Date(),
//     summary:
//       // eslint-disable-next-line max-len
//       'Blog 3 Blog Blog Blog Blog Blog Blog Blog Blog',
//   },
//   {
//     id: 3,
//     title: 'Blog title 4',
//     creationDate: new Date(),
//     summary:
//       // eslint-disable-next-line max-len
//       'Blog 4 Blog Blog Blog Blog Blog Blog Blog Blog',
//   },
// ];
