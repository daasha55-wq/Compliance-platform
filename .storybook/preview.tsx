import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/tokens/primitives.css'
import '../src/tokens/semantics.css'
import '../src/tokens/typography.css'

const withFont: Decorator = (Story) => (
  <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-default)', background: 'var(--surface-subtle)', padding: 'var(--space-4)' }}>
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [withFont],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'off' — тестовый модуль a11y завязан на тот же бэкенд, что и @storybook/addon-vitest
      // (мы его сознательно убрали), поэтому 'todo'/'error' оставляли в сайдбаре нерабочую
      // кнопку «Run tests». Сама панель Accessibility на странице story по-прежнему работает.
      test: 'off'
    }
  },
};

export default preview;