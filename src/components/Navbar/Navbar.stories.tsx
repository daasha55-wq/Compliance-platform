import type { Meta, StoryObj } from '@storybook/react-vite'
import { Navbar } from './Navbar'

/** Горизонтальная панель навигации: лого, разделы, аватар. Один вариант в каталоге. */
const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  args: { links: ['Case Queue', 'Confirmations', 'Account Settings'] },
  argTypes: {
    links: { control: 'object' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
