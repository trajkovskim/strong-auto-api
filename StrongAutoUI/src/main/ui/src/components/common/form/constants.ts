import { Size } from 'components/common/form/types';
import { textFontSize } from 'components/common/typography/constants';
import { FontSize } from 'components/common/typography/types';

export const fontSize: Record<FontSize, string> = {
  sm: textFontSize.sm,
  md: textFontSize.md,
  lg: textFontSize.md,
  xl: textFontSize.md,
  '2xl': textFontSize.lg,
  '3xl': textFontSize.xl,
  default: 'inherit',
};

export const inputSize: Record<Size, string> = {
  sm: `calc(${textFontSize.sm} + 25px)`,
  md: `calc(${textFontSize.md} + 30px)`,
  lg: `calc(${textFontSize.lg} + 35px)`,
  xl: `calc(${textFontSize.xl} + 40px)`,
  '2xl': `calc(${textFontSize['2xl']} + 45px)`,
  '3xl': `calc(${textFontSize['2xl']} + 50px)`,
  default: 'auto',
};

export const checkboxSize: Record<Size, string> = {
  sm: `calc(${textFontSize.sm} + 0.16rem)`,
  md: `calc(${textFontSize.md} + 0.32rem)`,
  lg: `calc(${textFontSize.lg} + 0.48rem)`,
  xl: `calc(${textFontSize.xl} + 0.64rem)`,
  '2xl': `calc(${textFontSize['2xl']} + 0.8rem)`,
  '3xl': `calc(${textFontSize['2xl']} + 0.96rem)`,
  default: 'auto',
};
