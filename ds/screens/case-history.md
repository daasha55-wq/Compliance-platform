# Screen: CaseHistory

**Wireframe source:** `ia/wireframes/CaseHistory.md`
**Final Screen Node ID:** `166:381`

## Composition

### Header (FILL×FIXED 64px)
- Слева: LogoIconSlot (плейсхолдер-квадрат, заменяется вручную как на остальных экранах) + Breadcrumb instance (`32:128`, override третьего сегмента → «Кейс #4821 — Ксения Воробьёва»; используются только 2 значимых сегмента, как в CaseDetail — «История» не выносится в хлебную крошку, эту роль берёт TabBar)
- Справа: иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10)

### Sidebar (FIXED 240px × FILL) — идентично CaseQueue/CaseDetail, включая пункт «Confirmations» (см. `screens/case-queue` → «Навигация Sidebar», добавлено 2026-09-10)
- «Case Queue» + «Confirmations» + «Account Settings» (локальная композиция, не компонент)

### Main (FILL×FILL)
- Tabs instance (`181:182`, `Active=Second, Size=Md`) — override текста второго таба → «История» (второй таб подсвечен как активный). Клик по «Сводка» ведёт назад на `Screen/CaseDetail` (`75:283`) через Figma-прототип (`ON_CLICK` → `NAVIGATE`) — см. `screens/case-detail` → TopGroup
- HistoryList (локальная композиция, без компонента) — 6 записей аудит-лога по кейсу #4821, `DS/Body/sm`, `text-default`

## Навигация (добавлено 2026-09-10)
Изначально переход CaseDetail → CaseHistory не был нигде реализован: на CaseDetail отсутствовал TabBar, а роль «истории» дублировал `AccordionRow «История кейса (аудит-лог)»` внутри ProgressiveDisclosure — два конфликтующих паттерна без связи между ними. Исправлено: на CaseDetail добавлен такой же Tabs instance (`Active=First`), дублирующий AccordionRow удалён, между двумя экранами настроен двусторонний прототип-переход по клику на вкладки.

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `text-default`, `text-muted`, `border-strong`
- Отступы: `space-3`, `space-4`, `space-6`, `space-8`
- Typography: `DS/Body/sm`, `DS/Body/sm Medium`

## История ограничения ДС (закрыто)
При первой сборке этого экрана обнаружился пробел: ComponentSet Tabs не позволял подсветить именно вторую вкладку (`State=active` жёстко подсвечивал первую). Закрыто прогоном `component_variants` — ось `State` заменена на `Active=None|First|Second` (+ добавлена ось `Size=Sm|Md`), инстанс на этом экране переключён на `Active=Second, Size=Md`. См. `ds/components.md` → Tabs.
