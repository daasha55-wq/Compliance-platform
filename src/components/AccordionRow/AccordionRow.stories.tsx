import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccordionRow } from './AccordionRow'

/** Свёрнутая по умолчанию секция прогрессивного раскрытия (AML/Sanctions/PEP, Документы, Правила). */
const meta = {
  title: 'Components/AccordionRow',
  component: AccordionRow,
  tags: ['autodocs'],
  args: { label: 'AML / Sanctions / PEP screening' },
  argTypes: {
    label: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AccordionRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Три реальных пункта ProgressiveDisclosure на screens/case-detail, друг под другом. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 320 }}>
      <AccordionRow label="AML / Sanctions / PEP screening" />
      <AccordionRow label="Документы" />
      <AccordionRow label="Полный список правил" />
    </div>
  ),
}
