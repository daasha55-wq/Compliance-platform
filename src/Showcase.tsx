import { useState } from 'react'
import styles from './Showcase.module.css'
import {
  Button,
  IconButton,
  Input,
  Dropdown,
  Card,
  Modal,
  Navbar,
  Tabs,
  Breadcrumb,
  Toast,
  Badge,
  RiskIndicator,
  Avatar,
  CaseQueueHeader,
  CaseQueueRow,
  ConfirmationHeader,
  ConfirmationRow,
  AccordionRow,
  type ButtonType,
  type ButtonSize,
} from './components'

const semanticColors: [string, string][] = [
  ['surface-default', 'var(--surface-default)'],
  ['surface-subtle', 'var(--surface-subtle)'],
  ['surface-action-primary', 'var(--surface-action-primary)'],
  ['surface-action-primary-hover', 'var(--surface-action-primary-hover)'],
  ['surface-action-secondary-hover', 'var(--surface-action-secondary-hover)'],
  ['surface-selected', 'var(--surface-selected)'],
  ['text-default', 'var(--text-default)'],
  ['text-muted', 'var(--text-muted)'],
  ['text-on-action', 'var(--text-on-action)'],
  ['text-error', 'var(--text-error)'],
  ['border-default', 'var(--border-default)'],
  ['border-strong', 'var(--border-strong)'],
  ['border-error', 'var(--border-error)'],
  ['border-focus-ring', 'var(--border-focus-ring)'],
  ['bg-success', 'var(--bg-success)'],
  ['bg-warning', 'var(--bg-warning)'],
  ['bg-error', 'var(--bg-error)'],
  ['bg-info', 'var(--bg-info)'],
]

const textStyles: [string, string][] = [
  ['DS/Heading/4xl', 'ds-heading-4xl'],
  ['DS/Heading/3xl', 'ds-heading-3xl'],
  ['DS/Heading/2xl', 'ds-heading-2xl'],
  ['DS/Heading/xl', 'ds-heading-xl'],
  ['DS/Heading/lg', 'ds-heading-lg'],
  ['DS/Body/base', 'ds-body-base'],
  ['DS/Body/sm', 'ds-body-sm'],
  ['DS/Body/sm Medium', 'ds-body-sm-medium'],
  ['DS/Body/xs', 'ds-body-xs'],
  ['DS/Label/xs', 'ds-label-xs'],
]

const buttonTypes: ButtonType[] = ['primary', 'secondary', 'ghost']
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg']

export default function Showcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState<'first' | 'second'>('first')

  return (
    <div className={styles.page}>
      <h1 className={`${styles.pageTitle} ds-heading-3xl`}>Дизайн-система — компонентная база</h1>

      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ds-heading-xl`}>Палитра (Semantic)</h2>
        <div className={styles.swatchGrid}>
          {semanticColors.map(([name, value]) => (
            <div key={name} className={styles.swatch}>
              <div className={styles.swatchColor} style={{ background: value }} />
              <span className={styles.swatchName}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ds-heading-xl`}>Шкала текста</h2>
        <div className={styles.section}>
          {textStyles.map(([name, cls]) => (
            <div key={name} className={styles.typeRow}>
              <span className={styles.typeName}>{name}</span>
              <span className={cls}>Очередь кейсов ожидает решения</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ds-heading-xl`}>Компоненты</h2>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Button</h3>
          {buttonTypes.map((type) => (
            <div key={type} className={styles.row}>
              {buttonSizes.map((size) => (
                <Button key={size} type={type} size={size}>
                  {type} / {size}
                </Button>
              ))}
              <Button type={type} disabled>
                disabled
              </Button>
            </div>
          ))}
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>IconButton</h3>
          <div className={styles.row}>
            <IconButton aria-label="действие">★</IconButton>
            <IconButton aria-label="действие" disabled>
              ★
            </IconButton>
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Input</h3>
          <div className={styles.row}>
            <Input placeholder="Default" />
            <Input placeholder="Error" state="error" />
            <Input placeholder="Disabled" disabled />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Dropdown</h3>
          <div className={styles.row}>
            <Dropdown label="Тир: Все" options={['Все', 'Low', 'Medium', 'High']} />
            <Dropdown label="Сортировка: по SLA" options={['По SLA', 'По дате']} defaultOpen />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Card</h3>
          <div className={styles.row}>
            <Card title="Default" state="default">
              Базовое состояние
            </Card>
            <Card title="Hover" state="hover">
              Наведение
            </Card>
            <Card title="Selected" state="selected">
              Выбрано
            </Card>
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Modal</h3>
          <Button type="secondary" onClick={() => setModalOpen(true)}>
            Открыть Modal
          </Button>
          {modalOpen && (
            <Modal
              title="Подтвердить решение"
              onCancel={() => setModalOpen(false)}
              onConfirm={() => setModalOpen(false)}
            >
              Это действие нельзя отменить.
            </Modal>
          )}
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Navbar</h3>
          <Navbar />
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Tabs</h3>
          <div className={styles.row}>
            <Tabs active={tab} onChange={setTab} size="md" />
            <Tabs active="second" size="sm" />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Breadcrumb</h3>
          <Breadcrumb segments={['Очередь кейсов', 'Кейс #4821 — Ксения Воробьёва']} />
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Toast</h3>
          <div className={styles.row}>
            <Toast variant="success">Решение сохранено</Toast>
            <Toast variant="warning">Требуется подтверждение</Toast>
            <Toast variant="error">Не удалось сохранить</Toast>
            <Toast variant="info">Источник данных обновлён</Toast>
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Badge</h3>
          <div className={styles.row}>
            <Badge variant="success">Одобрено (авто)</Badge>
            <Badge variant="warning">На проверке</Badge>
            <Badge variant="error">Просрочено</Badge>
            <Badge variant="info">Ожидает решения</Badge>
            <Badge variant="info" size="sm">
              Ожидает решения
            </Badge>
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>RiskIndicator</h3>
          <div className={styles.row}>
            <RiskIndicator tier="high">High risk</RiskIndicator>
            <RiskIndicator tier="medium">Medium risk</RiskIndicator>
            <RiskIndicator tier="low">Low risk</RiskIndicator>
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>Avatar</h3>
          <div className={styles.row}>
            <Avatar initials="КВ" />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>CaseQueueHeader / CaseQueueRow</h3>
          <div className={styles.tableWrap}>
            <CaseQueueHeader />
            <CaseQueueRow
              tier="high"
              tierLabel="High risk"
              applicant="Ксения Воробьёва"
              statusLabel="Ожидает решения"
              statusVariant="info"
              sla="—"
              date="24.08.2026"
              discrepancy="⚠ Расхождение есть"
            />
            <CaseQueueRow
              tier="medium"
              tierLabel="Medium risk"
              applicant="Артём Соколов"
              statusLabel="На проверке"
              statusVariant="warning"
              sla="18ч 32м"
              date="24.08.2026"
              discrepancy="—"
              state="hover"
            />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>ConfirmationHeader / ConfirmationRow</h3>
          <div className={styles.tableWrap}>
            <ConfirmationHeader />
            <ConfirmationRow
              tier="high"
              tierLabel="High risk"
              applicant="Мария Кузнецова"
              escalatedBy="А. Соколов"
              note="Требуется второе мнение"
              date="23.08.2026"
              waitingTime="4ч 12м"
            />
            <ConfirmationRow
              tier="medium"
              tierLabel="Medium risk"
              applicant="Роман Ефимов"
              escalatedBy="Д. Петрова"
              note="Расхождение источников"
              date="25.08.2026"
              waitingTime="1ч 05м"
              state="hover"
            />
          </div>
        </div>

        <div className={styles.componentBlock}>
          <h3 className={`${styles.componentName} ds-heading-lg`}>AccordionRow</h3>
          <div className={styles.row}>
            <AccordionRow label="AML / Sanctions / PEP screening" />
            <AccordionRow label="Документы" />
          </div>
        </div>
      </section>
    </div>
  )
}
