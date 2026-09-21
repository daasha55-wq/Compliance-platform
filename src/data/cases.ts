import type { RiskTier } from '../components'
import type { BadgeVariant } from '../components'

export type CaseStage = 'open' | 'escalated' | 'approved' | 'rejected'

export interface CaseDecision {
  type: 'approved' | 'escalated' | 'rejected'
  by: string
  date: string
  reason?: string
}

export interface CaseEscalation {
  escalatedBy: string
  note: string
  date: string
  waitingTime: string
}

export interface ExplainabilityPoint {
  text: string
}

export interface CaseRecord {
  id: string
  applicant: string
  dob: string
  jurisdiction: string
  verification: string
  tier: RiskTier
  tierLabel: string
  stage: CaseStage
  statusLabel: string
  statusVariant: BadgeVariant
  sla: string
  date: string
  discrepancy: string
  discrepancyNote?: string
  modelVersion: string
  explainability: string[]
  documents: string[]
  rules: string[]
  history: string[]
  escalation?: CaseEscalation
  decision?: CaseDecision
}

export const currentUser = 'Анна Смирнова'
export const currentRole = 'Compliance Officer'

export const seedCases: CaseRecord[] = [
  {
    id: '4821',
    applicant: 'Ксения Воробьёва',
    dob: '14.03.1991',
    jurisdiction: 'Кипр',
    verification: 'Подтверждён (Sumsub)',
    tier: 'high',
    tierLabel: 'High risk',
    stage: 'open',
    statusLabel: 'Ожидает решения',
    statusVariant: 'info',
    sla: '—',
    date: '24.08.2026',
    discrepancy: '⚠ Расхождение есть',
    discrepancyNote: 'Sumsub и ComplyAdvantage расходятся',
    modelVersion: 'risk-model v2.3',
    explainability: ['PEP-совпадение 82% схожести', 'Страна повышенного риска: Кипр', 'Возраст аккаунта отправителя < 30 дней'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — на проверке', 'Источник средств — не загружен'],
    rules: ['R-102 PEP screening', 'R-118 Страна повышенного риска', 'R-140 Возраст аккаунта'],
    history: [
      '24.08.2026, 09:20 — Обнаружено расхождение источников: дата рождения (Sumsub 14.03.1989 vs ComplyAdvantage 14.03.1988)',
      '24.08.2026, 09:15 — Риск-тир присвоен: High, правило risk-model v2.3',
      '24.08.2026, 09:14 — Кейс создан системой, входные данные получены от Sumsub/ComplyAdvantage',
    ],
  },
  {
    id: '4802',
    applicant: 'Артём Соколов',
    dob: '02.06.1994',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'medium',
    tierLabel: 'Medium risk',
    stage: 'open',
    statusLabel: 'На проверке',
    statusVariant: 'warning',
    sla: '18ч 32м',
    date: '24.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Средний скор по устройству и геолокации', 'Первая операция превышает типичный профиль'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — верифицирован'],
    rules: ['R-104 Device/geo scoring', 'R-121 Аномальная первая операция'],
    history: [
      '24.08.2026, 05:59 — Риск-тир присвоен: Medium, правило risk-model v2.3',
      '24.08.2026, 05:58 — Кейс создан системой, входные данные получены от Sumsub',
    ],
  },
  {
    id: '4795',
    applicant: 'Мария Кузнецова',
    dob: '21.11.1988',
    jurisdiction: 'Казахстан',
    verification: 'На проверке (ComplyAdvantage)',
    tier: 'high',
    tierLabel: 'High risk',
    stage: 'open',
    statusLabel: 'Ожидает подтверждения',
    statusVariant: 'info',
    sla: '—',
    date: '23.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Санкционный скрининг: частичное совпадение, требует ручной проверки', 'Юрисдикция повышенного риска: Казахстан'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Санкционная проверка — ожидает ComplyAdvantage'],
    rules: ['R-108 Sanctions partial match', 'R-118 Страна повышенного риска'],
    history: [
      '23.08.2026, 11:40 — Отправлен запрос на подтверждение в ComplyAdvantage',
      '23.08.2026, 11:32 — Риск-тир присвоен: High, правило risk-model v2.3',
      '23.08.2026, 11:30 — Кейс создан системой, входные данные получены от Sumsub',
    ],
  },
  {
    id: '4788',
    applicant: 'Дарья Петрова',
    dob: '09.02.1996',
    jurisdiction: 'Беларусь',
    verification: 'Подтверждён (Sumsub)',
    tier: 'medium',
    tierLabel: 'Medium risk',
    stage: 'open',
    statusLabel: 'Просрочено',
    statusVariant: 'error',
    sla: 'Просрочено',
    date: '22.08.2026',
    discrepancy: '⚠ Расхождение есть',
    discrepancyNote: 'Sumsub и ComplyAdvantage расходятся',
    modelVersion: 'risk-model v2.2',
    explainability: ['SLA по кейсу истёк 3 часа назад', 'Расхождение в адресе регистрации'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — расхождение'],
    rules: ['R-121 SLA breach', 'R-130 Расхождение адреса'],
    history: [
      '22.08.2026, 14:10 — SLA по кейсу истёк',
      '22.08.2026, 09:05 — Риск-тир присвоен: Medium, правило risk-model v2.2',
      '22.08.2026, 09:00 — Кейс создан системой, входные данные получены от Sumsub/ComplyAdvantage',
    ],
  },
  {
    id: '4771',
    applicant: 'Игорь Николаев',
    dob: '17.07.1990',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'low',
    tierLabel: 'Low risk',
    stage: 'approved',
    statusLabel: 'Одобрено (авто)',
    statusVariant: 'success',
    sla: '—',
    date: '25.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Низкий скор по всем факторам', 'Профиль соответствует типичному сегменту'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — верифицирован'],
    rules: ['R-100 Auto-approve threshold'],
    history: [
      '25.08.2026, 08:02 — Кейс одобрен автоматически по правилу risk-model v2.3',
      '25.08.2026, 08:01 — Риск-тир присвоен: Low, правило risk-model v2.3',
      '25.08.2026, 08:00 — Кейс создан системой, входные данные получены от Sumsub',
    ],
    decision: { type: 'approved', by: 'Система (авто)', date: '25.08.2026, 08:02' },
  },
  {
    id: '4763',
    applicant: 'Роман Ефимов',
    dob: '30.09.1993',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'medium',
    tierLabel: 'Medium risk',
    stage: 'open',
    statusLabel: 'На проверке',
    statusVariant: 'warning',
    sla: '3ч 10м',
    date: '25.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Средний скор по устройству и геолокации'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — верифицирован'],
    rules: ['R-104 Device/geo scoring'],
    history: [
      '25.08.2026, 10:51 — Риск-тир присвоен: Medium, правило risk-model v2.3',
      '25.08.2026, 10:50 — Кейс создан системой, входные данные получены от Sumsub',
    ],
  },
  {
    id: '4759',
    applicant: 'Светлана Гущина',
    dob: '05.12.1997',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'low',
    tierLabel: 'Low risk',
    stage: 'approved',
    statusLabel: 'Одобрено (авто)',
    statusVariant: 'success',
    sla: '—',
    date: '25.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Низкий скор по всем факторам'],
    documents: ['Паспорт — верифицирован (Sumsub)'],
    rules: ['R-100 Auto-approve threshold'],
    history: [
      '25.08.2026, 07:12 — Кейс одобрен автоматически по правилу risk-model v2.3',
      '25.08.2026, 07:11 — Риск-тир присвоен: Low, правило risk-model v2.3',
      '25.08.2026, 07:10 — Кейс создан системой, входные данные получены от Sumsub',
    ],
    decision: { type: 'approved', by: 'Система (авто)', date: '25.08.2026, 07:12' },
  },
  {
    id: '4835',
    applicant: 'Виктор Лебедев',
    dob: '02.11.1985',
    jurisdiction: 'Юрисдикция повышенного риска',
    verification: 'Подтверждён (Sumsub)',
    tier: 'high',
    tierLabel: 'High',
    stage: 'rejected',
    statusLabel: 'Отклонён',
    statusVariant: 'error',
    sla: '—',
    date: '23.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Санкционное совпадение (OFAC) — 0.91', 'Юрисдикция повышенного риска — 0.34', 'Возраст аккаунта отправителя < 30 дней — 0.12'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Санкционная проверка — совпадение OFAC'],
    rules: ['R-108 Sanctions match (OFAC)', 'R-118 Страна повышенного риска', 'R-140 Возраст аккаунта'],
    history: [
      '23.08.2026, 16:20 — Кейс отклонён Павлом Ковалёвым (Senior Compliance Officer)',
      '23.08.2026, 10:14 — Эскалирован на подтверждение Павлом Ковалёвым: «Страна повышенного риска не была учтена в первом правиле»',
      '23.08.2026, 09:40 — Обнаружено совпадение по санкционному списку OFAC (степень схожести 91%)',
      '23.08.2026, 09:15 — Риск-тир присвоен: High, правило risk-model v2.3',
      '23.08.2026, 09:14 — Кейс создан системой, входные данные получены от Sumsub',
    ],
    escalation: {
      escalatedBy: 'Павел Ковалёв',
      note: 'Страна повышенного риска не была учтена в первом правиле',
      date: '23.08.2026',
      waitingTime: '1д 6ч',
    },
    decision: {
      type: 'rejected',
      by: 'Павел Ковалёв (Senior Compliance Officer)',
      date: '23.08.2026, 16:20',
      reason: 'Подтверждено совпадение по санкционному списку OFAC (степень схожести 91%), страна регистрации — юрисдикция повышенного риска, не учтённая в первом правиле',
    },
  },
  {
    id: '4841',
    applicant: 'Дмитрий Орлов',
    dob: '19.04.1989',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'high',
    tierLabel: 'High risk',
    stage: 'escalated',
    statusLabel: 'Ожидает подтверждения',
    statusVariant: 'info',
    sla: '—',
    date: '24.08.2026',
    discrepancy: '⚠ Расхождение есть',
    discrepancyNote: 'Sumsub и ComplyAdvantage расходятся',
    modelVersion: 'risk-model v2.3',
    explainability: ['Расхождение источников критично', 'Юрисдикция повышенного риска'],
    documents: ['Паспорт — верифицирован (Sumsub)', 'Подтверждение адреса — расхождение'],
    rules: ['R-130 Расхождение адреса', 'R-118 Страна повышенного риска'],
    history: [
      '24.08.2026, 10:00 — Эскалирован на подтверждение Анной Смирновой: «Расхождение источников критично, прошу подтверждения»',
      '24.08.2026, 08:20 — Риск-тир присвоен: High, правило risk-model v2.3',
      '24.08.2026, 08:15 — Кейс создан системой, входные данные получены от Sumsub/ComplyAdvantage',
    ],
    escalation: {
      escalatedBy: 'Анна Смирнова',
      note: 'Расхождение источников критично, прошу подтверждения',
      date: '24.08.2026',
      waitingTime: '9ч',
    },
  },
  {
    id: '4819',
    applicant: 'Наталья Фомина',
    dob: '11.01.1992',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'medium',
    tierLabel: 'Medium risk',
    stage: 'escalated',
    statusLabel: 'Ожидает подтверждения',
    statusVariant: 'info',
    sla: '—',
    date: '23.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Пограничный случай, SLA истекает завтра'],
    documents: ['Паспорт — верифицирован (Sumsub)'],
    rules: ['R-121 SLA приближается'],
    history: [
      '23.08.2026, 12:15 — Эскалирован на подтверждение Анной Смирновой: «Пограничный случай, SLA истекает завтра»',
      '23.08.2026, 08:05 — Риск-тир присвоен: Medium, правило risk-model v2.3',
      '23.08.2026, 08:00 — Кейс создан системой, входные данные получены от Sumsub',
    ],
    escalation: {
      escalatedBy: 'Анна Смирнова',
      note: 'Пограничный случай, SLA истекает завтра',
      date: '23.08.2026',
      waitingTime: '1д 4ч',
    },
  },
  {
    id: '4823',
    applicant: 'Ольга Тарасова',
    dob: '28.05.1995',
    jurisdiction: 'Россия',
    verification: 'Подтверждён (Sumsub)',
    tier: 'medium',
    tierLabel: 'Medium risk',
    stage: 'escalated',
    statusLabel: 'Ожидает подтверждения',
    statusVariant: 'info',
    sla: '—',
    date: '24.08.2026',
    discrepancy: '—',
    modelVersion: 'risk-model v2.3',
    explainability: ['Офицер не уверен в скоре, требуется второе мнение'],
    documents: ['Паспорт — верифицирован (Sumsub)'],
    rules: ['R-121 Второе мнение запрошено'],
    history: [
      '24.08.2026, 06:30 — Эскалирован на подтверждение Анной Смирновой: «Не уверена, эскалирую для второго мнения»',
      '24.08.2026, 06:05 — Риск-тир присвоен: Medium, правило risk-model v2.3',
      '24.08.2026, 06:00 — Кейс создан системой, входные данные получены от Sumsub',
    ],
    escalation: {
      escalatedBy: 'Анна Смирнова',
      note: 'Не уверена, эскалирую для второго мнения',
      date: '24.08.2026',
      waitingTime: '8ч',
    },
  },
]
