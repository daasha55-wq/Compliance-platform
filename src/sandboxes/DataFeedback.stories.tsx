import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseQueueHeader } from '../components/CaseQueueHeader'
import { CaseQueueRow } from '../components/CaseQueueRow'
import { Toast } from '../components/Toast'

/**
 * Таблица очереди кейсов (CaseQueueHeader + CaseQueueRow) + Toast с результатом действия.
 * Table и Tooltip в `ds/components.md` нет (Table удалён в final_screens, Tooltip не заводился) —
 * песочница показывает то, что реально играет роль «данные + обратная связь» в этой ДС.
 */
const meta = {
  title: 'Sandboxes/Данные и обратная связь',
  tags: ['autodocs', '!test'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DecisionSaved: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', width: 'fit-content' }}>
        <CaseQueueHeader />
        <CaseQueueRow
          tier="high"
          tierLabel="High risk"
          applicant="Ксения Воробьёва"
          statusLabel="Одобрено"
          statusVariant="success"
          sla="—"
          date="24.08.2026"
          discrepancy="—"
        />
      </div>
      <Toast variant="success">Решение по кейсу #4821 сохранено</Toast>
    </div>
  ),
}
