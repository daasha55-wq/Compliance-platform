import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

/** Однострочное текстовое поле ввода. */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'name@company.com', state: 'default' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'error'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = { args: { state: 'error', defaultValue: 'некорректный e-mail' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'compliance@bank.ru' } }

/** State=Default|Error|Disabled рядом (Hover/Focus — нативные, см. страницу компонента). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <Input placeholder="Default" />
      <Input placeholder="Error" state="error" defaultValue="некорректный e-mail" />
      <Input placeholder="Disabled" disabled defaultValue="compliance@bank.ru" />
    </div>
  ),
}
