import { withProvider } from '@cebus/react-storybook';
import * as NextImage from 'next/image';
import '../src/styles/globals.css';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
});

/** @type {NonNullable<import('@storybook/react').Story['decorators']>} */
export const decorators = [withProvider];

/** @type {import('@storybook/react').Parameters} */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    disable: true,
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
};
