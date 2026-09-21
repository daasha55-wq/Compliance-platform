import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

/** Статус-метка (риск-тир, состояние кейса). */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { variant: 'info', size: 'md', children: 'Ожидает решения' },
  argTypes: {
    variant: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = { args: { variant: 'success', children: 'Одобрено (авто)' } }
export const Warning: Story = { args: { variant: 'warning', children: 'На проверке' } }
export const Error: Story = { args: { variant: 'error', children: 'Просрочено' } }
export const Info: Story = { args: { variant: 'info', children: 'Ожидает решения' } }

/** Матрица Variant × Size — все варианты рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge variant="success" size={size}>
            Одобрено (авто)
          </Badge>
          <Badge variant="warning" size={size}>
            На проверке
          </Badge>
          <Badge variant="error" size={size}>
            Просрочено
          </Badge>
          <Badge variant="info" size={size}>
            Ожидает решения
          </Badge>
        </div>
      ))}
    </div>
  ),
}
