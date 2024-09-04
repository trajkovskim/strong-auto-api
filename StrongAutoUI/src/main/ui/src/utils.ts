import { VehicleImage, VehicleImageEmbeddedResponse } from 'generated/strongauto';
import { TranslationFunction } from 'hooks';
import { css } from 'styled-components';
import theme, { Breakpoints, LARGEST_BREAKPOINT } from 'theme';

export const goto = (url: string) => {
  window.location.replace(url);
};

export const call = (tel: string) => {
  window.open(`tel:${tel}`);
};

export const mailTo = (emailTo: string, otherParameters?: Record<string, string>) => {
  if (!otherParameters) {
    window.open(`mailto:${emailTo}`, '_self');
    return;
  }

  window.open(
    `mailto:${emailTo}?${Object.entries(otherParameters)
      .map((entry) => entry.join('='))
      .join('&')}`,
    '_self'
  );
};

export const formatNumber = (num: string | number, separator = ',') => {
  if (num == undefined || num == null) {
    return num;
  }

  const numAsString = typeof num === 'number' ? num.toString() : num;

  const pointPosition = numAsString.indexOf('.');
  const length = numAsString.length - pointPosition === -1 ? 0 : pointPosition;

  if (length <= 3) {
    return numAsString;
  }

  let start = 0;
  let result = '';

  if (length % 3) {
    start = length % 3;
    result = numAsString.substring(0, start) + separator;
  }

  for (let i = start; i < length; i += 3) {
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

export const createKeyValueListFromTranslations = (
  prefixKey: string,
  t: TranslationFunction,
  key = 'key',
  value = 'value'
) => {
  const items: { key: string; value: string }[] = [];
  const listPrefix = `${prefixKey}`;

  const itemsPrefix = `${listPrefix}`;
  for (let i = 0; !t(`${itemsPrefix}.${i}.${key}`).toString().endsWith(`${itemsPrefix}.${i}.${key}`); i++) {
    items.push({ key: `${itemsPrefix}.${i}.${key}`, value: `${itemsPrefix}.${i}.${value}` });
  }

  return items;
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
  const matrix: {
    title: string;
    items: string[];
  }[] = [];
  const listPrefix = `${prefixKey}.matrix`;

  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let exit = true;
    let j = 0;

    const listTitle = t(`${listPrefix}.${i}.title`);
    const itemsPrefix = t(`${listPrefix}.${i}.items`);
    while (!t(`${itemsPrefix}.${j}`).toString().endsWith(`${itemsPrefix}.${j}`)) {
      if (matrix.length <= i) {
        matrix[i] = {
          title: listTitle,
          items: [],
        };
      }
      exit = false;
      matrix[i].items.push(t(`${itemsPrefix}.${j}`));
      ++j;
    }

    if (exit) {
      break;
    }
    ++i;
  }

  return matrix;
};

export const transformBase64Image = (image: VehicleImage) => {
  return `data:${image.contentType};base64,${image.data}`;
};

export const mapProductImagesToBinaryLink = (images: VehicleImageEmbeddedResponse[] | undefined) =>
  (images?.map((image) => image.links?.binary?.href).filter(Boolean) as string[]) ?? [];
