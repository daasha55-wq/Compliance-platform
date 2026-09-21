import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseQueueRow } from './CaseQueueRow'
import { CaseQueueHeader } from '../CaseQueueHeader'

/** Строка кейса в очереди — риск-тир, заявитель, статус, SLA, дата, расхождение источников. */
const meta = {
  title: 'Components/CaseQueueRow',
  component: CaseQueueRow,
  tags: ['autodocs'],
  args: {
    tier: 'high',
    tierLabel: 'High risk',
    applicant: 'Ксения Воробьёва',
    statusLabel: 'Ожидает решения',
    statusVariant: 'info',
    sla: '—',
    date: '24.08.2026',
    discrepancy: '⚠ Расхождение есть',
    state: 'default',
  },
  argTypes: {
    tier: { control: 'inline-radio', options: ['high', 'medium', 'low'] },
    statusVariant: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
    state: { control: 'inline-radio', options: ['default', 'hover'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CaseQueueRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hover: Story = { args: { state: 'hover' } }

/** State=Default|Hover рядом, в контексте CaseQueueHeader. */
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', width: 'fit-content' }}>
      <CaseQueueHeader />
      <CaseQueueRow {...args} state="default" />
      <CaseQueueRow {...args} state="hover" applicant="Артём Соколов" statusLabel="На проверке" statusVariant="warning" sla="18ч 32м" discrepancy="—" />
    </div>
  ),
}
