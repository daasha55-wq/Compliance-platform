# Screen: CaseDetail

**Wireframe source:** `ia/wireframes/CaseDetail.md`
**Final Screen Node ID:** `75:283`

## Новый компонент под этот экран (Фаза 2.5)

### AccordionRow
**Назначение:** свёрнутая по умолчанию секция прогрессивного раскрытия (AML/Sanctions/PEP, Документы, История, Правила)
**Анатомия:** Chevron (▸ текстовый символ) → Label (`DS/Body/sm Medium`)
**Варианты:** — (один вариант; раскрытое состояние — кандидат на будущий `component_variants`-проход, см. примечание ниже)
**Привязки:** fill `surface-subtle`, текст `text-default`

Остальное — переиспользование существующего каталога: RiskIndicator, Badge, Button, Breadcrumb (уже подходит без изменений — два editable text-сегмента). Новых Semantic-токенов не требуется. (Avatar здесь не используется — см. «Иконки» ниже и `ds/components.md` → Avatar, screens_audit 2026-09-10)

## Composition

### Header (FILL×FIXED 64px)
- Слева: Logo (плейсхолдер) + Breadcrumb instance (`32:128`, override второго сегмента → «Кейс #4821 — Ксения Воробьёва»)
- Справа: иконка Lucide `user-round-arrow-left` (не Avatar instance — см. `ds/components.md` → Avatar, screens_audit 2026-09-10)

### Sidebar (FIXED 240px × FILL) — идентично CaseQueue, включая пункт «Confirmations» (см. `screens/case-queue` → «Навигация Sidebar», добавлено 2026-09-10)

### Main (FILL×FIXED, DecisionPanel прижат к низу через TopGroup + `primaryAxisAlignItems=SPACE_BETWEEN`, как в исходном low-fi wireframe)

#### TopGroup (VERTICAL, HUG, gap `space-6`) — добавлено 2026-09-10
Обёртка над Tabs + ContentGroup, нужна чтобы зафиксировать 24px-отступ между табами и контентом, не ломая `SPACE_BETWEEN` прижатие DecisionPanel к низу экрана.

##### Tabs instance (`181:173`, `Tabs/First/Md`, override второго таба → «История»)
Симметрично `screens/case-history` (там `Active=Second`), клик по вкладке «История» ведёт на `Screen/CaseHistory` (`166:381`) через Figma-прототип (`ON_CLICK` → `NAVIGATE`); обратная связь настроена на CaseHistory → клик по «Сводка» ведёт назад на этот экран. Закрывает найденный пользователем разрыв: раньше на CaseDetail не было визуального пути на CaseHistory, а `AccordionRow «История кейса (аудит-лог)»` внутри ProgressiveDisclosure дублировал ту же роль in-place — этот AccordionRow удалён (было 4 пункта, стало 3).

##### ContentGroup
##### CaseSummaryBar (FILL×HUG)
- TierStatusRow: RiskIndicator instance (`Tier=High`, override текста → «High risk») + Badge instance (`Variant=Info, Size=Md`, текст «Ожидает решения»)
- IdentityRow (inline text): «Ксения Воробьёва» / «14.03.1991» / «Кипр» / «Подтверждён (Sumsub)»
- DiscrepancyBanner (локальная композиция, 1 вхождение — не компонент): FILL-ширина полоса, `surface-subtle`, текст «⚠ Sumsub и ComplyAdvantage расходятся»

##### ExplainabilitySummary (FILL×HUG)
- Fill `surface-subtle`, padding space-4
- «Версия модели: risk-model v2.3» (`DS/Body/sm Medium`)
- 3 пункта: «PEP-совпадение 82% схожести», «Страна повышенного риска: Кипр», «Возраст аккаунта отправителя < 30 дней» (`DS/Body/sm`)
- Подпись «Полный список правил — в разделе ниже» (`DS/Body/xs`, `text-muted`)

##### ProgressiveDisclosure (FILL×HUG)
- 3 × AccordionRow instance: «AML / Sanctions / PEP screening», «Документы», «Полный список правил» (пункт «История кейса (аудит-лог)» удалён 2026-09-10 — дублировал TabBar/CaseHistory, см. TopGroup выше)
- Все свёрнуты по умолчанию (соответствует wireframe и user story 9 — прогрессивное раскрытие). Содержимое разворота (статусы AML, превью документов, таблица правил) не рендерится как отдельные видимые слои в этом прогоне — кандидат на отдельный `component_variants`-проход State=Expanded, если понадобится

#### DecisionPanel (FILL×HUG, всегда видна — High-сценарий по умолчанию)
- Button instance (`Type=Primary, State=Disabled`, текст «Подтвердить решение») — неактивна, пока Explainability не была видна (бизнес-правило из wireframe)
- Button instance (`Type=Secondary, State=Default`, текст «Эскалировать на подтверждение»)
- Button instance (`Type=Secondary, State=Default`, текст «Отклонить»)

## Edge cases

### ErrorState (`visible: false`)
- Заменяет CaseSummaryBar + ExplainabilitySummary + ProgressiveDisclosure на блок: иконка предупреждения + «Sumsub временно недоступен» (`DS/Heading/lg`) + «Данные обновятся автоматически при восстановлении соединения» (`DS/Body/sm`, `text-muted`)

### DecisionPanel — Medium-вариант (`visible: false`)
- Те же 3 кнопки (Подтвердить — `State=Default`, не disabled) + текст остатка SLA рядом

### DecisionPanel — Low-вариант (`visible: false`)
- Кнопки скрыты, вместо них информационная строка «Кейс одобрен автоматически 25.08.2026 в 14:03 по правилу risk-model v2.3» (`DS/Body/sm`, `surface-subtle` фон)

## Edge cases (закрыто прогоном final_screens 2026-09-10)

### LoadingState (`visible: false`)
3 skeleton-бара (`surface-subtle`, `radius-sm`), высоты 108/150/192px — по одному на CaseSummaryBar/ExplainabilitySummary/ProgressiveDisclosure, gap `space-6`

### DeletedState (`visible: false`)
«Кейс был удалён или отозван» (`DS/Heading/lg`, `text-default`) + «Кейс #4821 больше не доступен для просмотра. Обратитесь к администратору, если это ошибка» (`DS/Body/sm`, `text-muted`)

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `border-default`, `text-default`, `text-muted`, `text-error`
- Отступы: `space-2`, `space-4`, `space-6`, `space-8`
- Typography: `DS/Heading/lg`, `DS/Body/xs`, `DS/Body/sm`, `DS/Body/sm Medium`

## Иконки
- Логотип-слот — заменён вручную на Lucide `rows-3` 24px, stroke `surface-action-primary`
- Аватар-слот — заменён вручную на Lucide `user-round-arrow-left` 24px, stroke `border-strong`
- ⚠ (расхождение / ошибка) — Lucide `triangle-alert` 14px
- Chevron аккордеона — текстовый символ ▸ (соответствует low-fi wireframe, не отдельная иконка)
