import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'

/** Диалоговое окно: заголовок + тело + кнопки подтверждения/отмены. Один вариант в каталоге. */
const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    title: 'Подтвердить решение',
    children: 'Кейс будет помечен как одобренный. Это действие нельзя отменить.',
    confirmLabel: 'Подтвердить',
    cancelLabel: 'Отмена',
  },
  argTypes: {
    title: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Длинный скроллящийся контент — тело прокручивается, заголовок и кнопки остаются на месте. */
export const LongContent: Story = {
  args: {
    title: 'Полный список сработавших правил',
    children: (
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <li key={i}>Правило risk-model v2.3 — пункт {i + 1}: расхождение источников данных</li>
        ))}
      </ul>
    ),
  },
}
