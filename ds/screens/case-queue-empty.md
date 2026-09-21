# Screen: CaseQueueEmpty

**Wireframe source:** `ia/wireframes/CaseQueueEmpty.md`
**Low-fi Node ID:** `218:318`
**Final Screen Node ID:** `219:318`

## Контекст
Пустая очередь кейсов уже существовала как скрытое (`visible: false`) `EmptyState` внутри `CaseQueue.CaseTable` (`65:262`). Этот экран — тот же утверждённый контент, вынесенный в отдельный видимый экран, по аналогии с тем, как `CaseDetailRejected` был вынесен из состояния `DecisionPanel-Rejected` на `CaseDetail`. Новых компонентов не потребовалось — полное переиспользование каталога.

## Composition

### Header (FILL×FIXED 64px) — идентично CaseQueue
- Слева: Logo (плейсхолдер) + заголовок «Очередь кейсов» (`DS/Heading/lg`)
- Справа: иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10; при первой сборке этого экрана здесь стоял настоящий Avatar-instance, затем заменён на иконку тем же способом, что и на остальных 5 экранах)

### Sidebar (FIXED 240px × FILL) — идентично CaseQueue, включая пункт «Confirmations» (см. `screens/case-queue` → «Навигация Sidebar», добавлено 2026-09-10)
- NavItem «Case Queue» (активный) + NavItem «Confirmations» + NavItem «Account Settings»

### Main (FILL×FILL)

#### FilterBar (FILL×HUG) — те же контролы, что и на заполненной очереди
- Слева: текст-сегмент «Тир: Все / Low / Medium / High» (локально, без Dropdown instance — упрощено до статичного текста, т.к. на пустой выборке взаимодействие с фильтром не демонстрируется отдельно от CaseQueue)
- Справа: «0 кейсов в очереди» (`DS/Body/sm Medium`, `text-default`)

#### EmptyPlate (по центру оставшегося пространства, `primaryAxisAlignItems=CENTER`)
- Иконка Lucide `inbox` (заменена с изначального плейсхолдера-квадрата 2026-09-10; промежуточный вариант — `ghost` — отклонён: не соответствует серьёзному тону compliance-инструмента, а «ghost» имеет собственное значение в AML-домене — «ghost accounts» / фиктивные учётные записи, что создаёт нежелательную смысловую коллизию именно на экране Compliance Officer)
- «Очередь пуста» (`DS/Heading/lg`, `text-default`, по центру)
- «Новые кейсы появятся здесь по мере поступления заявок» (`DS/Body/sm`, `text-muted`, по центру)
- Без CTA — решение зафиксировано в `ia/wireframes/CaseQueue.md`

## Известные упрощения
FilterBar не использует Dropdown instance (в отличие от CaseQueue/ConfirmationQueue) — тир-фильтр здесь статичный текст, т.к. это не самостоятельный интерактивный экран, а витрина состояния пустой выборки; сами контролы уже задокументированы как интерактивные на `screens/case-queue`.

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `surface-action-primary`, `text-default`, `text-muted`
- Отступы: `space-3`, `space-4`, `space-6`, `space-8`
- Radius: `radius-lg`
- Typography: `DS/Heading/lg`, `DS/Body/sm`, `DS/Body/sm Medium`

## Иконки
- Логотип-слот — остаётся плейсхолдером (не заменён на Lucide в этом прогоне, т.к. экран не входил в исходный `final_screens`-набор с иконками)
- Иллюстрация EmptyPlate — Lucide `inbox` 100×100, stroke `#000000` 2px round cap/join (см. выше)
