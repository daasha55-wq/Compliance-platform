import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

/**
 * Визуальное представление пользователя в Header. Один вариант (State=Default) в каталоге.
 * На собранных экранах слот аватара сейчас занят вручную собранной Lucide-иконкой, а не
 * инстансом этого компонента — см. `ds/components.md` → Avatar, screens_audit 2026-09-10.
 */
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { initials: 'КВ' },
  argTypes: {
    initials: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
