import { webDarkTokens } from './webDarkTheme';
import { webLightTokens } from './webLightTheme';
import { webLightTheme as baseProps } from '@cebus/react-components';

export const webLightTheme = {
  ...baseProps,
  ...webLightTokens,
};

export const webDarkTheme = {
  ...baseProps,
  ...webDarkTokens,
};
