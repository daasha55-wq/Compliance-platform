import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

/** Переключение между разделами контента на одном экране (Сводка / Аудит-лог). */
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: { firstLabel: 'Сводка', secondLabel: 'Аудит-лог', active: 'first', size: 'md' },
  argTypes: {
    active: { control: 'inline-radio', options: ['none', 'first', 'second'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    firstLabel: { control: 'text' },
    secondLabel: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const First: Story = { args: { active: 'first' } }
export const Second: Story = { args: { active: 'second' } }
export const NoneActive: Story = { args: { active: 'none' } }

/** Матрица Active × Size — все варианты рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ width: 60, fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-muted)' }}>
            {size}
          </span>
          {(['none', 'first', 'second'] as const).map((active) => (
            <Tabs key={active} active={active} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
}
