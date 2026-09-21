import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'

/** Квадратная кнопка под одиночную иконку. */
const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { children: '★', 'aria-label': 'Действие' },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }

/** State=Default|Disabled рядом (Hover — нативный, см. страницу компонента). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton aria-label="Действие">★</IconButton>
      <IconButton aria-label="Действие" disabled>
        ★
      </IconButton>
    </div>
  ),
}
