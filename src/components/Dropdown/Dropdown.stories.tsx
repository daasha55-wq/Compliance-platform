import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'

/** Поле выбора одного значения из списка — для FilterBar (тир, статус, сортировка). */
const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { label: 'Тир: Все', options: ['Все', 'Low', 'Medium', 'High'] },
  argTypes: {
    label: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Open: Story = { args: { defaultOpen: true } }

/** Длинный список — меню скроллится (max-height 240px), не растягивает страницу. */
export const LongOptionList: Story = {
  args: {
    label: 'Ответственный: не назначен',
    defaultOpen: true,
    options: [
      'Не назначен',
      'А. Соколов',
      'Д. Петрова',
      'И. Николаев',
      'Р. Ефимов',
      'С. Гущина',
      'М. Кузнецова',
      'К. Воробьёва',
      'Н. Захарова',
      'В. Морозов',
      'Т. Белова',
      'О. Козлов',
    ],
  },
}

/** Длинная подпись — усекается многоточием, не ломает layout FilterBar. */
export const LongLabel: Story = {
  args: {
    label: 'Сортировка: по времени ожидания подтверждения (по убыванию)',
    options: ['По SLA', 'По дате', 'По времени ожидания'],
  },
}

/** Нет доступных значений — явный текст вместо пустого меню без обратной связи. */
export const EmptyOptions: Story = {
  args: { label: 'Ответственный: —', defaultOpen: true, options: [] },
}

/** State=default|open рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Dropdown label="Статус: Все" options={['Все', 'Ожидает решения', 'На проверке']} />
      <Dropdown label="Сортировка: по SLA" options={['По SLA', 'По дате']} defaultOpen />
    </div>
  ),
}
