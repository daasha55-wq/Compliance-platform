import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandMark } from './BrandMark'

/** Знак «Слои» с названием продукта. */
const meta = {
  title: 'Components/BrandMark',
  component: BrandMark,
  tags: ['autodocs'],
  args: { size: 28, withWordmark: true },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 64, step: 4 } },
    withWordmark: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof BrandMark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const MarkOnly: Story = { args: { withWordmark: false, size: 40 } }

/** Знак в размерах 16 / 24 / 32 / 64. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {[16, 24, 32, 64].map((size) => (
        <BrandMark key={size} size={size} withWordmark={false} />
      ))}
    </div>
  ),
}
