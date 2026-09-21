import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../components/Input'
import { Dropdown } from '../components/Dropdown'
import { Button } from '../components/Button'

/** Набор Input + Dropdown + кнопки submit/cancel, включая состояние ошибки на одном из полей. */
const meta = {
  title: 'Sandboxes/Форма',
  tags: ['autodocs', '!test'],
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LoginForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input placeholder="Рабочий e-mail" defaultValue="compliance@bank.ru" />
      <Input placeholder="Пароль" type="password" state="error" defaultValue="123" />
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-xs)', color: 'var(--text-error)' }}>
        Пароль должен содержать не менее 8 символов
      </span>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button type="secondary" size="sm">
          Отмена
        </Button>
        <Button type="primary" size="sm">
          Войти
        </Button>
      </div>
    </div>
  ),
}

export const FilterForm: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Dropdown label="Тир: Все" options={['Все', 'Low', 'Medium', 'High']} />
      <Dropdown label="Статус: Все" options={['Все', 'Ожидает решения', 'На проверке']} />
      <Dropdown label="Сортировка: по SLA" options={['По SLA', 'По дате']} />
      <Button type="ghost" size="sm">
        Сбросить
      </Button>
    </div>
  ),
}
