import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

/** Путь по иерархии экрана (раздел / объект). Последний сегмент — текущий (current). */
const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: { segments: ['Очередь кейсов', 'Кейс #4821 — Ксения Воробьёва'] },
  argTypes: {
    segments: { control: 'object' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const TwoSegments: Story = {}
export const ThreeSegments: Story = {
  args: { segments: ['Очередь кейсов', 'Эскалации', 'Кейс #4821 — Ксения Воробьёва'] },
}
