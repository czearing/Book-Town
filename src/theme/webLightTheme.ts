import { themeGenerator } from '@cebus/react-theme-generator';
import type { ColorTokens } from '@cebus/react-components';

export const webLightTokens: ColorTokens = themeGenerator({
  canvasColor: '#ffffff',
  semanticColors: {
    inherit: '#444444',
    brand: '#4A973E',
    secondary: '#CF4646',
    success: '#278536',
    danger: '#de3309',
    social: '#1d9aee',
    warning: '#eb6807',
    info: '#258e97',
  },
});
