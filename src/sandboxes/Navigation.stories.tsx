import type { Meta, StoryObj } from '@storybook/react-vite'
import { Navbar } from '../components/Navbar'
import { Tabs } from '../components/Tabs'
import { Breadcrumb } from '../components/Breadcrumb'

/**
 * Navbar + Tabs + Breadcrumb в одном контексте.
 * Pagination в `ds/components.md` нет (не входит в каталог) — песочница ограничена
 * реально существующими навигационными компонентами базы.
 */
const meta = {
  title: 'Sandboxes/Навигация',
  tags: ['autodocs', '!test'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CaseDetailContext: Story = {
  render: () => (
    <div>
      <Navbar links={['Case Queue', 'Confirmations', 'Account Settings']} />
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Breadcrumb segments={['Очередь кейсов', 'Кейс #4821 — Ксения Воробьёва']} />
        <Tabs firstLabel="Сводка" secondLabel="Аудит-лог" active="first" size="md" />
      </div>
    </div>
  ),
}
