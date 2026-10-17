import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

/** Основное интерактивное действие (подтвердить, отменить, отклонить). */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { type: 'primary', size: 'md', children: 'Подтвердить решение' },
  argTypes: {
    type: { control: 'inline-radio', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { type: 'primary' } }
export const Secondary: Story = { args: { type: 'secondary', children: 'Эскалировать на подтверждение' } }
export const Danger: Story = { args: { type: 'danger', children: 'Отклонить' } }
export const Ghost: Story = { args: { type: 'ghost', children: 'Отмена' } }
export const Disabled: Story = { args: { type: 'primary', disabled: true } }

/** Матрица Type × Size — все варианты рядом, плюс disabled на каждом type. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['primary', 'secondary', 'danger', 'ghost'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} type={type} size={size}>
              {type} / {size}
            </Button>
          ))}
          <Button type={type} disabled>
            disabled
          </Button>
        </div>
      ))}
    </div>
  ),
}
