import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmationHeader } from './ConfirmationHeader'

/** Строка заголовков колонок таблицы эскалаций. Один вариант в каталоге. */
const meta = {
  title: 'Components/ConfirmationHeader',
  component: ConfirmationHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConfirmationHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
