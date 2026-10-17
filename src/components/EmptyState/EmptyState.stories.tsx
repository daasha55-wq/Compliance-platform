import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { EmptyState } from './EmptyState'

/** Пустые состояния с иллюстрациями в стиле «Слои». */
const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    variant: 'queue-empty',
    title: 'Очередь пуста',
    description: 'Новые кейсы появятся здесь по мере поступления заявок',
  },
  argTypes: {
    variant: { control: 'select', options: ['queue-empty', 'filter-empty', 'confirm-empty', 'not-found'] },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const QueueEmpty: Story = {}

export const FilterEmpty: Story = {
  args: {
    variant: 'filter-empty',
    title: 'По этому фильтру кейсов нет',
    description: 'Попробуйте сбросить фильтр тира или статуса',
    action: (
      <Button type="secondary" size="sm">
        Сбросить фильтры
      </Button>
    ),
  },
}

export const ConfirmEmpty: Story = {
  args: {
    variant: 'confirm-empty',
    title: 'Нет кейсов, ожидающих подтверждения',
    description: 'Кейсы появятся здесь, когда Compliance Officer эскалирует решение',
  },
}

export const NotFound: Story = {
  args: {
    variant: 'not-found',
    title: 'Кейс не найден',
    description: 'Кейс #4821 не найден. Проверьте номер или вернитесь в очередь',
  },
}
