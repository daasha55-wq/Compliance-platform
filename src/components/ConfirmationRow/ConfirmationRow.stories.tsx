import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmationRow } from './ConfirmationRow'
import { ConfirmationHeader } from '../ConfirmationHeader'

/** Строка эскалированного кейса (риск-тир, заявитель, эскалировал, заметка, дата, время ожидания). */
const meta = {
  title: 'Components/ConfirmationRow',
  component: ConfirmationRow,
  tags: ['autodocs'],
  args: {
    tier: 'high',
    tierLabel: 'High risk',
    applicant: 'Мария Кузнецова',
    escalatedBy: 'А. Соколов',
    note: 'Требуется второе мнение',
    date: '23.08.2026',
    waitingTime: '4ч 12м',
    state: 'default',
  },
  argTypes: {
    tier: { control: 'inline-radio', options: ['high', 'medium', 'low'] },
    state: { control: 'inline-radio', options: ['default', 'hover'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConfirmationRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hover: Story = { args: { state: 'hover' } }

/** State=Default|Hover рядом, в контексте ConfirmationHeader. */
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', width: 'fit-content' }}>
      <ConfirmationHeader />
      <ConfirmationRow {...args} state="default" />
      <ConfirmationRow {...args} state="hover" applicant="Роман Ефимов" escalatedBy="Д. Петрова" note="Расхождение источников" waitingTime="1ч 05м" />
    </div>
  ),
}
