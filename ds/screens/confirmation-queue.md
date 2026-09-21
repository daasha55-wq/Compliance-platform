# Screen: ConfirmationQueue

**Wireframe source:** `ia/wireframes/ConfirmationQueue.md`
**Final Screen Node ID:** `73:217`

## Новые компоненты под этот экран (Фаза 2.5)

### ConfirmationHeader
**Назначение:** строка заголовков колонок таблицы эскалаций
**Анатомия:** 6 текстовых ячеек фиксированной ширины (100/170/160/330/140/100), gap space-6
**Варианты:** — (один вариант)
**Привязки:** fill `surface-subtle`, текст `DS/Body/sm Medium`, `text-muted`

### ConfirmationRow
**Назначение:** строка эскалированного кейса — риск-тир, заявитель, эскалировал, заметка, дата, время ожидания
**Анатомия:** RiskIndicator instance → Заявитель (text) → Эскалировал (text) → Заметка эскалации (text) → Дата (text) → В ожидании (text)
**Варианты:** State: Default | Hover
**Привязки:** fill `surface-default`/`surface-subtle`, border-bottom `border-default`, текст `DS/Body/sm`

Ни один компонент не требует новых Semantic-токенов — переиспользуют существующие.

## Composition

### Header (FILL×FIXED 64px) — идентично CaseQueue
- Слева: Logo (плейсхолдер) + заголовок «Ожидает подтверждения» (`DS/Heading/lg`)
- Справа: подпись роли «Senior Compliance Officer» (`DS/Body/xs`, `text-muted`) + иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10)

### Sidebar (FIXED 240px × FILL) — идентично CaseQueue по структуре
- NavItem «Case Queue» (клик → `screens/case-queue`) + NavItem «Confirmations» (активный) + NavItem «Account Settings». См. `screens/case-queue` → «Навигация Sidebar» (добавлено 2026-09-10, унификация меню на всех экранах)

### Main (FILL×HUG)

#### FilterBar (FILL×HUG)
- Слева: текст-сегмент «Тир: Все / Medium / High» (локально) + Dropdown instance (`30:149`, текст-override «Сортировка: по дате эскалации»)
- Справа: текст «5 кейсов ожидают подтверждения»

#### ConfirmationTable (FILL×HUG)
- ConfirmationHeader instance
- 5 × ConfirmationRow instance:
  1. High / Ксения Воробьёва / Анна Смирнова / «Не согласна с авто-скором, PEP-совпадение требует второго мнения» / 24.08.2026 / 6ч
  2. High / Дмитрий Орлов / Павел Ковалёв / «Расхождение источников критично, прошу подтверждения» / 24.08.2026 / 9ч
  3. Medium / Наталья Фомина / Анна Смирнова / «Пограничный случай, SLA истекает завтра» / 23.08.2026 / 1д 4ч
  4. High / Виктор Лебедев / Павел Ковалёв / «Страна повышенного риска не была учтена в первом правиле» / 23.08.2026 / 1д 6ч
  5. Medium / Ольга Тарасова / Анна Смирнова / «Не уверена, эскалирую для второго мнения» / 24.08.2026 / 8ч

## Edge cases

### Empty state (внутри ConfirmationTable, `visible: false`)
- По центру: плейсхолдер-иллюстрация (rounded rect 120×120, `surface-subtle`) + заголовок «Нет кейсов, ожидающих подтверждения» (`DS/Heading/lg`) + подпись «Кейсы появятся здесь, когда Compliance Officer эскалирует решение» (`DS/Body/sm`, `text-muted`)

## Edge cases (закрыто прогоном final_screens 2026-09-10)

### LoadingState (`visible: false`)
5 skeleton-строк (`surface-subtle`, `radius-sm`, высота 48px, gap `space-1`) — по аналогии с CaseQueue LoadingState

### ErrorState (`visible: false`)
«⚠ Источник данных недоступен» (`DS/Heading/lg`, `text-default`) + «Список эскалаций обновится автоматически при восстановлении соединения» (`DS/Body/sm`, `text-muted`)

### OverflowState (`visible: false`)
Строка с Button instance (`Type=Ghost, Size=Md`) — «Показать ещё 9 кейсов»

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `border-default`, `text-default`, `text-muted`
- Отступы: `space-2`, `space-4`, `space-6`, `space-8`
- Typography: `DS/Heading/lg`, `DS/Body/xs`, `DS/Body/sm`, `DS/Body/sm Medium`

## Иконки
- Логотип-слот — заменён вручную на Lucide `message-circle-dashed-check` 24px, stroke `icon-success` (зелёный — подтверждение/эскалация; перепривязано с прямого `success-500` на Semantic alias)
- Аватар-слот — заменён вручную на Lucide `user-round-arrow-left` 24px, stroke `border-strong`
