import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '../components/Modal'
import { Input } from '../components/Input'
import { Badge } from '../components/Badge'

/** Modal с полями формы и Badge внутри тела — как компоненты ведут себя вместе, не по одному. */
const meta = {
  title: 'Sandboxes/Модальное окно',
  // '!test' — песочница собирает несколько компонентов сразу, без единого component
  // addon-vitest не строит suite ("No test suite found"); autodocs работает как обычно.
  tags: ['autodocs', '!test'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ConfirmDecision: Story = {
  render: () => (
    <Modal title="Подтвердить решение по кейсу" confirmLabel="Подтвердить" cancelLabel="Отмена">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          Кейс #4821 — Ксения Воробьёва <Badge variant="info" size="sm">Ожидает решения</Badge>
        </div>
        <Input placeholder="Комментарий к решению (опционально)" />
      </div>
    </Modal>
  ),
}
