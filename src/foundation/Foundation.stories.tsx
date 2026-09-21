import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorGrid, type Swatch } from './ColorPalette'

/**
 * Foundation — все токены дизайн-системы: Primitive (глобальные) и Semantic (смысловые).
 * Источник значений — `ds/foundation.md`. Здесь токены выводятся из `src/tokens/*.css`,
 * не хардкодятся отдельно — расхождение с CSS-переменными означает, что либо `ds/foundation.md`,
 * либо `src/tokens/` устарели.
 */
const meta = {
  title: 'Foundation/Overview',
  // '!test' — страница токенов без единого component, addon-vitest не может собрать
  // под неё suite ("No test suite found"); autodocs при этом работает как обычно.
  tags: ['autodocs', '!test'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const primitiveAccent: Swatch[] = [
  { name: 'accent-100', value: 'var(--accent-100)' },
  { name: 'accent-300', value: 'var(--accent-300)' },
  { name: 'accent-500', value: 'var(--accent-500)' },
  { name: 'accent-700', value: 'var(--accent-700)' },
  { name: 'accent-900', value: 'var(--accent-900)' },
]

const primitiveGray: Swatch[] = [
  { name: 'gray-00', value: 'var(--gray-00)' },
  { name: 'gray-50', value: 'var(--gray-50)' },
  { name: 'gray-100', value: 'var(--gray-100)' },
  { name: 'gray-200', value: 'var(--gray-200)' },
  { name: 'gray-300', value: 'var(--gray-300)' },
  { name: 'gray-500', value: 'var(--gray-500)' },
  { name: 'gray-700', value: 'var(--gray-700)' },
  { name: 'gray-900', value: 'var(--gray-900)' },
  { name: 'gray-950', value: 'var(--gray-950)' },
]

const primitiveFunctional: Swatch[] = [
  { name: 'success-500', value: 'var(--success-500)' },
  { name: 'warning-500', value: 'var(--warning-500)' },
  { name: 'error-500', value: 'var(--error-500)' },
  { name: 'info-500', value: 'var(--info-500)' },
]

const semanticSurfaces: Swatch[] = [
  { name: 'surface-default', value: 'var(--surface-default)', note: '→ gray-00' },
  { name: 'surface-subtle', value: 'var(--surface-subtle)', note: '→ gray-50' },
  { name: 'surface-action-primary', value: 'var(--surface-action-primary)', note: '→ accent-500' },
  { name: 'surface-action-primary-hover', value: 'var(--surface-action-primary-hover)', note: '→ accent-700' },
  { name: 'surface-action-secondary-hover', value: 'var(--surface-action-secondary-hover)', note: '→ gray-100' },
  { name: 'surface-selected', value: 'var(--surface-selected)', note: '→ accent-100' },
]

const semanticText: Swatch[] = [
  { name: 'text-default', value: 'var(--text-default)', note: '→ gray-900' },
  { name: 'text-muted', value: 'var(--text-muted)', note: '→ gray-500' },
  { name: 'text-on-action', value: 'var(--text-on-action)', note: '→ gray-00' },
  { name: 'text-error', value: 'var(--text-error)', note: '→ error-500' },
]

const semanticBorders: Swatch[] = [
  { name: 'border-default', value: 'var(--border-default)', note: '→ gray-200' },
  { name: 'border-strong', value: 'var(--border-strong)', note: '→ gray-300' },
  { name: 'border-error', value: 'var(--border-error)', note: '→ error-500' },
  { name: 'border-focus-ring', value: 'var(--border-focus-ring)', note: '→ accent-500' },
]

const semanticState: Swatch[] = [
  { name: 'bg-success', value: 'var(--bg-success)', note: '→ success-500' },
  { name: 'bg-warning', value: 'var(--bg-warning)', note: '→ warning-500' },
  { name: 'bg-error', value: 'var(--bg-error)', note: '→ error-500' },
  { name: 'bg-info', value: 'var(--bg-info)', note: '→ info-500' },
  { name: 'icon-success', value: 'var(--icon-success)', note: '→ success-500' },
]

/** Primitive — акцент, серая шкала, функциональные цвета. */
export const PrimitiveColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 className="ds-heading-lg">Accent</h3>
        <ColorGrid swatches={primitiveAccent} />
      </div>
      <div>
        <h3 className="ds-heading-lg">Gray</h3>
        <ColorGrid swatches={primitiveGray} />
      </div>
      <div>
        <h3 className="ds-heading-lg">Функциональные</h3>
        <ColorGrid swatches={primitiveFunctional} />
      </div>
    </div>
  ),
}

/** Semantic — алиасы поверх Primitive: поверхности, текст, обводки, состояния. */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 className="ds-heading-lg">Поверхности</h3>
        <ColorGrid swatches={semanticSurfaces} />
      </div>
      <div>
        <h3 className="ds-heading-lg">Текст</h3>
        <ColorGrid swatches={semanticText} />
      </div>
      <div>
        <h3 className="ds-heading-lg">Обводки</h3>
        <ColorGrid swatches={semanticBorders} />
      </div>
      <div>
        <h3 className="ds-heading-lg">Состояния</h3>
        <ColorGrid swatches={semanticState} />
      </div>
    </div>
  ),
}

const textStyles: [string, string][] = [
  ['DS/Heading/4xl', 'ds-heading-4xl'],
  ['DS/Heading/3xl', 'ds-heading-3xl'],
  ['DS/Heading/2xl', 'ds-heading-2xl'],
  ['DS/Heading/xl', 'ds-heading-xl'],
  ['DS/Heading/lg', 'ds-heading-lg'],
  ['DS/Body/base', 'ds-body-base'],
  ['DS/Body/sm', 'ds-body-sm'],
  ['DS/Body/sm Medium', 'ds-body-sm-medium'],
  ['DS/Body/xs', 'ds-body-xs'],
  ['DS/Label/xs', 'ds-label-xs'],
]

/** Типографика — 10 TextStyle из `ds/CONTRACT.md`. Цвет не зашит в стиль — как в Figma TextStyle. */
export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {textStyles.map(([name, cls]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <span style={{ width: 220, flexShrink: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-muted)' }}>
            {name}
          </span>
          <span className={cls}>Очередь кейсов ожидает решения</span>
        </div>
      ))}
    </div>
  ),
}

const spacing = ['space-1', 'space-2', 'space-3', 'space-4', 'space-6', 'space-8', 'space-12', 'space-16']
const radii = ['radius-none', 'radius-sm', 'radius-md', 'radius-lg']
const shadows = ['shadow-sm', 'shadow-md', 'shadow-lg']

/** Отступы, радиусы, тени. */
export const SpacingRadiusShadow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 className="ds-heading-lg">Отступы</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {spacing.map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ width: 100, fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-muted)' }}>
                {s}
              </span>
              <div style={{ height: 16, width: `var(--${s})`, background: 'var(--surface-action-primary)' }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="ds-heading-lg">Радиусы</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          {radii.map((r) => (
            <div key={r} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, background: 'var(--surface-action-primary)', borderRadius: `var(--${r})` }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-muted)' }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="ds-heading-lg">Тени</h3>
        <div style={{ display: 'flex', gap: 32 }}>
          {shadows.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 96, height: 64, background: 'var(--surface-default)', borderRadius: 'var(--radius-md)', boxShadow: `var(--${s})` }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
