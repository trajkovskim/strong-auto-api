import { FontSize } from 'components/common/typography/types';

export const NEW_LINE_DELIMITER = '\n';

export const titleFontSize: Record<FontSize, string> = {
  sm: 'var(--title-fs-0)',
  md: 'var(--title-fs-1)',
  lg: 'var(--title-fs-2)',
  xl: 'var(--title-fs-3)',
  '2xl': 'var(--title-fs-4)',
  '3xl': 'var(--title-fs-5)',
  default: 'inherit',
};
export const titleFontSizeMobile: Record<FontSize, string> = titleFontSize;
export const titleFontSizeTablet: Record<FontSize, string> = titleFontSizeMobile;

export const textFontSize: Record<FontSize, string> = {
  sm: 'var(--text-fs-0)',
  md: 'var(--text-fs-1)',
  lg: 'var(--text-fs-2)',
  xl: 'var(--text-fs-3)',
  '2xl': 'var(--text-fs-4)',
  '3xl': 'var(--text-fs-5)',
  default: 'inherit',
};

export const textFontSizeMobile: Record<FontSize, string> = textFontSize;
export const textFontSizeTablet: Record<FontSize, string> = textFontSizeMobile;

export const iconFontSize: Record<FontSize, string> = {
  sm: 'var(--icon-fs-0)',
  md: 'var(--icon-fs-1)',
  lg: 'var(--icon-fs-2)',
  xl: 'var(--icon-fs-3)',
  '2xl': 'var(--icon-fs-4)',
  '3xl': 'var(--icon-fs-5)',
  default: 'inherit',
};
