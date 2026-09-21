import type { ComponentType } from 'react'
import Login from './login/Login'
import CaseQueue from './case-queue/CaseQueue'
import CaseQueueEmpty from './case-queue-empty/CaseQueueEmpty'
import ConfirmationQueue from './confirmation-queue/ConfirmationQueue'
import CaseDetail from './case-detail/CaseDetail'
import CaseHistory from './case-history/CaseHistory'
import Landing from './landing/Landing'

export interface ScreenEntry {
  id: string
  name: string
  description: string
  route: string
  component: ComponentType
}

export const screens: ScreenEntry[] = [
  {
    id: 'landing',
    name: 'Landing',
    description: 'Маркетинговый лендинг: Hero, боль, регуляторика, дифференциаторы, как это работает, роли, доверие, цена, FAQ',
    route: '/screens/landing',
    component: Landing,
  },
  {
    id: 'login',
    name: 'Login',
    description: 'Аутентификация — форма входа по email/паролю',
    route: '/screens/login',
    component: Login,
  },
  {
    id: 'case-queue',
    name: 'CaseQueue',
    description: 'Очередь кейсов: обзор и приоритизация по риск-тиру и SLA (Compliance Officer)',
    route: '/screens/case-queue',
    component: CaseQueue,
  },
  {
    id: 'case-queue-empty',
    name: 'CaseQueueEmpty',
    description: 'Очередь кейсов без данных — пустое состояние',
    route: '/screens/case-queue-empty',
    component: CaseQueueEmpty,
  },
  {
    id: 'confirmation-queue',
    name: 'ConfirmationQueue',
    description: 'Кейсы, эскалированные через 4-eyes, финальное решение (Senior Compliance Officer)',
    route: '/screens/confirmation-queue',
    component: ConfirmationQueue,
  },
  {
    id: 'case-detail',
    name: 'CaseDetail',
    description: 'Карточка кейса: сводка → explainability → прогрессивное раскрытие → решение',
    route: '/screens/case-detail/4821',
    component: CaseDetail,
  },
  {
    id: 'case-detail-rejected',
    name: 'CaseDetailRejected',
    description: 'Карточка кейса — отказной исход (закрытый кейс, решение принято)',
    route: '/screens/case-detail/4835',
    component: CaseDetail,
  },
  {
    id: 'case-history',
    name: 'CaseHistory',
    description: 'Read-only аудит-лог кейса',
    route: '/screens/case-history/4821',
    component: CaseHistory,
  },
]
