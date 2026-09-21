# Screen: CaseDetailRejected

**Wireframe source:** `ia/wireframes/CaseDetailRejected.md`
**Final Screen Node ID:** `190:391`

## Назначение
Закрывает пробел, найденный при ревью набора wireframes: все существующие экраны показывали happy path (заполненные данные, кейс в работе) — ни один явно не показывал отказной исход. Продолжение кейса из `screens/confirmation-queue` (Виктор Лебедев, эскалирован Павлом Ковалёвым) — Senior Compliance Officer вынес финальное решение «Отклонить».

## Composition

### Header (FILL×FIXED 64px) — идентично CaseDetail
- LogoIconSlot (плейсхолдер, заменяется вручную как на остальных экранах) + Breadcrumb instance (`32:128`, override третьего сегмента → «Кейс #4835 — Виктор Лебедев»)
- иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10)

### Sidebar (FIXED 240px × FILL) — идентично CaseQueue/CaseDetail, включая пункт «Confirmations» (см. `screens/case-queue` → «Навигация Sidebar», добавлено 2026-09-10)

### Main (FILL×FILL)

#### CaseSummaryBar (FILL×HUG)
- TierStatusRow: RiskIndicator instance (`61:136` → `Tier=High`) + Badge instance (`18:296` → `Variant=Error, Size=Md`, текст «Отклонён» — первое использование Error-варианта Badge на реальном экране)
- IdentityRow (inline text): «Виктор Лебедев» / «02.11.1985» / «Юрисдикция повышенного риска» / «Подтверждён (Sumsub)»

#### RejectionBanner (FILL×HUG, новая локальная композиция — не компонент, 1 вхождение, по аналогии с DiscrepancyBanner на CaseDetail)
- «Кейс отклонён» (`DS/Body/sm Medium`, `text-error`)
- «23.08.2026, 16:20 — Павел Ковалёв (Senior Compliance Officer)» (`DS/Body/sm`, `text-muted`)
- «Причина: подтверждено совпадение по санкционному списку OFAC (степень схожести 91%)...» (`DS/Body/sm`, `text-default`)

#### ExplainabilitySummary (FILL×HUG) — тот же паттерн, что на CaseDetail
Остаётся видимой после отказа — эксплейнабилити не скрывается вместе с закрытием кейса.

#### ProgressiveDisclosure (FILL×HUG)
4 × AccordionRow instance (`75:137`): «AML / Sanctions / PEP screening», «Документы», «История кейса (аудит-лог)», «Полный список правил» — все свёрнуты по умолчанию, идентично CaseDetail

#### DecisionPanel-Rejected (FILL×HUG)
- Текст «Кейс отклонён 23.08.2026 в 16:20 Павлом Ковалёвым. Дальнейшие действия недоступны.» (`DS/Body/sm`, `text-muted`) — вместо трёх кнопок решения (кейс закрыт)
- Button instance (`18:280` → `Type=Ghost, State=Default, Size=Md`) — «Просмотреть полную историю решения»

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `text-default`, `text-muted`, `text-error`, `border-strong`
- Отступы: `space-2`, `space-3`, `space-4`, `space-6`, `space-8`
- Typography: `DS/Body/sm`, `DS/Body/sm Medium`, `DS/Body/xs`

## Известные ограничения
DiscrepancyBanner с CaseDetail сюда не перенесён: причина отказа Лебедева — не расхождение источников, а санкционное совпадение + необученное правило по юрисдикции. Переносить банер ради единообразия без реального основания значило бы искажать конкретный сценарий.

## Edge cases

### ErrorState (`visible: false`)
По аналогии с CaseDetail ErrorState — недоступность Sumsub при загрузке закрытого кейса. Текст «⚠ Sumsub временно недоступен» (`DS/Heading/lg`, `text-default`) + «Данные обновятся автоматически при восстановлении соединения» (`DS/Body/sm`, `text-muted`). Заменяет собой CaseSummaryBar/RejectionBanner/ExplainabilitySummary/ProgressiveDisclosure; DecisionPanel-Rejected остаётся видимой — тот же паттерн, что на CaseDetail.

### LoadingState (`visible: false`)
4 skeleton-бара (`surface-subtle`, `radius-sm`), высоты 90/132/166/180px — по одному на CaseSummaryBar/RejectionBanner/ExplainabilitySummary/ProgressiveDisclosure, gap `space-6`.

Оба состояния добавлены прогоном `final_screens` 2026-09-10, закрывают пробел из `screens_audit`.
