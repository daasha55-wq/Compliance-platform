import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

/** Всплывающее уведомление о результате действия (например, после решения по кейсу). */
const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { variant: 'success', children: 'Решение сохранено' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['success', 'warning', 'error', 'info'] },
    children: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = { args: { variant: 'success', children: 'Решение сохранено' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Требуется подтверждение' } }
export const Error: Story = { args: { variant: 'error', children: 'Не удалось сохранить' } }
export const Info: Story = { args: { variant: 'info', children: 'Источник данных обновлён' } }

/** Длинный текст — переносится по словам, ширина ограничена (max-width 360px). */
export const LongMessage: Story = {
  args: {
    variant: 'error',
    children:
      'Не удалось синхронизировать данные с Sumsub: сервис вернул тайм-аут через 30 секунд. Повторная попытка запланирована автоматически через 5 минут.',
  },
}

/** Несколько тостов в очереди — как они складываются друг под другом. */
export const Stacked: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Toast variant="success">Кейс #4821 одобрен</Toast>
      <Toast variant="info">Кейс #4790 передан на эскалацию</Toast>
      <Toast variant="warning">2 кейса приближаются к SLA</Toast>
    </div>
  ),
}

/** Variant=success|warning|error|info рядом. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast variant="success">Решение сохранено</Toast>
      <Toast variant="warning">Требуется подтверждение</Toast>
      <Toast variant="error">Не удалось сохранить</Toast>
      <Toast variant="info">Источник данных обновлён</Toast>
    </div>
  ),
}
