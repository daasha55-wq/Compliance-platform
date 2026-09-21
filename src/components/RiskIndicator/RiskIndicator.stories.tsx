import type { Meta, StoryObj } from '@storybook/react-vite'
import { RiskIndicator } from './RiskIndicator'

/** Визуальный индикатор риск-тира кейса — форма + подпись, тир не кодируется только цветом. */
const meta = {
  title: 'Components/RiskIndicator',
  component: RiskIndicator,
  tags: ['autodocs'],
  args: { tier: 'high', children: 'High risk' },
  argTypes: {
    tier: { control: 'inline-radio', options: ['high', 'medium', 'low'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RiskIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const High: Story = { args: { tier: 'high', children: 'High risk' } }
export const Medium: Story = { args: { tier: 'medium', children: 'Medium risk' } }
export const Low: Story = { args: { tier: 'low', children: 'Low risk' } }

/** Tier=High|Medium|Low рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <RiskIndicator tier="high">High risk</RiskIndicator>
      <RiskIndicator tier="medium">Medium risk</RiskIndicator>
      <RiskIndicator tier="low">Low risk</RiskIndicator>
    </div>
  ),
}
