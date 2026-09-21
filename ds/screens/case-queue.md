# Screen: CaseQueue

**Wireframe source:** `ia/wireframes/CaseQueue.md`
**Final Screen Node ID:** `65:125`

## Новые компоненты под этот экран (Фаза 2.5)

### CaseQueueHeader
**Назначение:** строка заголовков колонок таблицы очереди кейсов
**Анатомия:** 6 текстовых ячеек фиксированной ширины (120/200/180/120/140/256), gap space-6
**Варианты:** — (один вариант)
**Привязки:** fill `surface-subtle`, текст `DS/Body/sm Medium`, `text-muted`

### CaseQueueRow
**Назначение:** строка кейса в очереди — риск-тир, заявитель, статус, SLA, дата, расхождение источников
**Анатомия:** RiskIndicator instance → Заявитель (text) → Статус (Badge instance) → SLA (text) → Дата (text) → Расхождение (text)
**Варианты:** State: Default | Hover
**Привязки:** fill `surface-default`/`surface-subtle`, border-bottom `border-default`, текст ячеек `DS/Body/sm`

## Composition

### Header (FILL×FIXED 64px)
- Auto Layout horizontal, space-between, padding space-8 (32) горизонтально, по центру вертикально
- Background: `surface-default`
- Слева: Logo (плейсхолдер-прямоугольник 32×32, `surface-subtle`, заменяется вручную) + заголовок «Очередь кейсов» (`DS/Heading/lg`, `text-default`)
- Справа: иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10)

### Sidebar (FIXED 240px × FILL)
- Auto Layout vertical, padding space-6, gap space-4
- Background: `surface-subtle`
- NavItem-текст «Case Queue» (активный, `DS/Body/sm Medium`, `text-default`) — локальная композиция, не компонент (решено в Фазе 1.5)
- NavItem-текст «Confirmations» (`DS/Body/sm`, `text-muted`) — клик ведёт на `Screen/ConfirmationQueue` (`73:217`) через Figma-прототип. **Добавлено 2026-09-10** — см. «Навигация Sidebar» ниже
- NavItem-текст «Account Settings» (`DS/Body/sm`, `text-muted`)

## Навигация Sidebar (добавлено 2026-09-10)
Пользователь заметил разрыв: с `screens/case-history` не было пути на `screens/confirmation-queue`, потому что Sidebar на каждом экране показывал только 2 пункта — текущий раздел + Account Settings, без остальных разделов (`Confirmations` существовал только на самом `ConfirmationQueue`, `Case Queue` отсутствовал там). Исправлено на всех 6 финальных экранах (CaseQueue, ConfirmationQueue, CaseDetail, CaseHistory, CaseDetailRejected, CaseQueueEmpty): Sidebar теперь везде содержит оба пункта «Case Queue» и «Confirmations» + «Account Settings», активный подсвечен (`text-default`/Medium), остальные — `text-muted`/Regular с прототип-переходом по клику на соответствующий экран. `Screen/Login` из этого правила исключён — экран до аутентификации, Sidebar на нём нет.

### Main (FILL×HUG)
- Auto Layout vertical, padding space-8, gap space-6
- Background: `surface-default`

#### FilterBar (FILL×HUG)
- Auto Layout horizontal, space-between
- Слева: текст-сегмент «Тир: Все / Low / Medium / High» (локально, решено в Фазе 1.5) + Dropdown instance (`30:149`, текст-override «Статус: Все») + Dropdown instance (`30:149`, текст-override «Сортировка: по SLA»)
- Справа: текст «24 кейса в очереди» (`DS/Body/sm Medium`)

#### CaseTable (FILL×HUG)
- Auto Layout vertical, gap 4
- CaseQueueHeader instance (заголовки колонок)
- 7 × CaseQueueRow instance, данные из wireframe:
  1. High / Ксения Воробьёва / Ожидает решения (Badge Info) / — / 24.08.2026 / ⚠ Расхождение есть
  2. Medium / Артём Соколов / На проверке (Badge Warning) / 18ч 32м / 24.08.2026 / —
  3. High / Мария Кузнецова / Ожидает подтверждения (Badge Info) / — / 23.08.2026 / —
  4. Medium / Дарья Петрова / Просрочено (Badge Error) / Просрочено / 22.08.2026 / ⚠ Расхождение есть
  5. Low / Игорь Николаев / Одобрено (авто) (Badge Success) / — / 25.08.2026 / —
  6. Medium / Роман Ефимов / На проверке (Badge Warning) / 3ч 10м / 25.08.2026 / —
  7. Low / Светлана Гущина / Одобрено (авто) (Badge Success) / — / 25.08.2026 / —

## Edge cases

### Empty state (внутри CaseTable, `visible: false`)
- По центру: плейсхолдер-иллюстрация (rounded rect 120×120, `surface-subtle`) + заголовок «Очередь пуста» (`DS/Heading/lg`) + подпись «Новые кейсы появятся здесь по мере поступления заявок» (`DS/Body/sm`, `text-muted`)
- Без CTA (см. wireframe — очередь наполняется системой)

### Loading state (внутри CaseTable, `visible: false`)
- 6 × серая полоса-скелетон (rect, `surface-subtle`, высота 20px, ширина по колонке) вместо строк
- Header/Sidebar/FilterBar остаются как в default

## Edge cases (закрыто прогоном final_screens 2026-09-10)

### ErrorState (`visible: false`)
«⚠ Источник данных недоступен» (`DS/Heading/lg`, `text-default`) + «Очередь кейсов обновится автоматически при восстановлении соединения» (`DS/Body/sm`, `text-muted`)

### OverflowState (`visible: false`)
Строка с Button instance (`Type=Ghost, Size=Md`) — «Показать ещё 17 кейсов»

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `border-default`, `text-default`, `text-muted`
- Отступы: `space-3`, `space-4`, `space-6`, `space-8`
- Typography: `DS/Heading/lg`, `DS/Body/sm`, `DS/Body/sm Medium`

## Иконки
- Логотип-слот — заменён вручную на Lucide `rows-3` 24px, stroke `surface-action-primary`
- Аватар-слот — заменён вручную на Lucide `user-round-arrow-left` 24px, stroke `border-strong`
- Стрелка Dropdown — уже встроена в компонент (символ ▾), отдельно не требуется
- Расхождение источников (⚠) — Lucide `triangle-alert` 14px, `text-error`
