import { TranslationFunction } from 'hooks';
import { css } from 'styled-components';
import theme, { Breakpoints, LARGEST_BREAKPOINT } from 'theme';

export const goto = (url: string) => {
  window.location.replace(url);
};

export const call = (tel: string) => {
  window.open(`tel:${tel}`);
};

export const mailTo = (emailTo: string) => {
  window.open(`mailto:${emailTo}`, '_self');
};

export const formatNumber = (num: string | number, separator = ',') => {
  if (num == undefined || num == null) {
    return num;
  }

  const numAsString = typeof num === 'number' ? num.toString() : num;

  if (numAsString.length <= 3) {
    return numAsString;
  }

  let start = 0;
  let result = '';

  if (numAsString.length % 3) {
    start = numAsString.length % 3;
    result = numAsString.substring(0, start) + separator;
  }

  for (let i = start; i < numAsString.length; i += 3) {
    result += numAsString.substring(i, i + 3) + separator;
  }

  return result.substring(0, result.length - 1);
};

export const formatMoney = (num: string | number, separator = ',') => '$' + formatNumber(num, separator);

export const getElementHeight = (el: HTMLElement) => {
  const list = [
    'margin-top',
    'margin-bottom',
    'border-top',
    'border-bottom',
    'padding-top',
    'padding-bottom',
    'height',
  ];

  const style = window.getComputedStyle(el);
  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur);
};

export const getElementWidth = (el: Element, include: 'right' | 'left' | 'both' = 'both') => {
  let list: string[] = ['width'];

  if (include === 'left' || include === 'both') {
    list = [...list, 'margin-left', 'padding-left', 'border-left'];
  }

  if (include === 'right' || include === 'both') {
    list = [...list, 'margin-right', 'padding-right', 'border-right'];
  }

  const style = window.getComputedStyle(el);
  return list.map((k) => parseInt(style.getPropertyValue(k), 10)).reduce((prev, cur) => prev + cur);
};

export const createMedia = (breakpoint: Breakpoints, csss?: ReturnType<typeof css>) => {
  const minWidth = `(min-width: ${theme.breakpoints.minWidth[breakpoint]})`;
  const maxWidth =
    breakpoint !== LARGEST_BREAKPOINT ? `and (max-width: ${theme.breakpoints.maxWidth[breakpoint]})` : '';

  return css`
    @media ${minWidth}${maxWidth} {
      ${csss};
    }
  `;
};

export const getCssProperty = (el: HTMLElement | null, property: string) => {
  if (!el) {
    return '0';
  }

  return window.getComputedStyle(el, null).getPropertyValue(property);
};

export const getCssPropertyAsNumber = (el: HTMLElement | null, property: string) => {
  return parseInt(getCssProperty(el, property), 10);
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const createListFromTranslations = (prefixKey: string, t: TranslationFunction) => {
  const items = [];
  const listPrefix = `${prefixKey}`;
  const title = t(`${listPrefix}.title`);

  const itemsPrefix = `${listPrefix}.items`;
  for (let i = 0; !t(`${itemsPrefix}.${i}`).toString().endsWith(`${itemsPrefix}.${i}`); i++) {
    items.push(t(`${itemsPrefix}.${i}`));
  }

  return { title, items };
};

export const createMatrixFromTranslations = (prefixKey: string, t: TranslationFunction) => {
  const matrix = [];
  const listPrefix = `${prefixKey}.matrix`;

  for (let i = 0; !t(`${listPrefix}.${i}`).toString().endsWith(`${listPrefix}.${i}`); i++) {
    matrix.push(createListFromTranslations(`${listPrefix}.${i}`, t));
  }

  return matrix;
};
