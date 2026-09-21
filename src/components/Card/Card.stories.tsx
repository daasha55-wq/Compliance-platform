import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

/**
 * Контейнер с заголовком и телом для сгруппированного контента.
 * В Figma-каталоге у ComponentSet нет варианта State=Default (только Hover/Selected) —
 * известный пробел, см. `ds/components.md`. Default в коде — базовое состояние по умолчанию.
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: { title: 'AML / Sanctions / PEP screening', children: 'Совпадений не найдено', state: 'default' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'hover', 'selected'] },
    title: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hover: Story = { args: { state: 'hover' } }
export const Selected: Story = { args: { state: 'selected' } }

/** State=Default|Hover|Selected рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card title="Default" state="default">
        Совпадений не найдено
      </Card>
      <Card title="Hover" state="hover">
        Совпадений не найдено
      </Card>
      <Card title="Selected" state="selected">
        Совпадений не найдено
      </Card>
    </div>
  ),
}
