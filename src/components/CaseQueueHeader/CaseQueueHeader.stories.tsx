import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseQueueHeader } from './CaseQueueHeader'

/** Строка заголовков колонок таблицы очереди кейсов. Один вариант в каталоге. */
const meta = {
  title: 'Components/CaseQueueHeader',
  component: CaseQueueHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CaseQueueHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
