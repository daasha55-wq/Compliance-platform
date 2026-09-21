# Components

Каталог компонентов UI-кита. Источник истины — Figma Design-файл (`https://www.figma.com/design/k6nxGiPftILxoV7xi07Wzt/Complinance-platform`), страница «Foundation»: SectionNode «Foundation» → фрейм «Components» (baseline) и SectionNode «UI Kit — extended» → фрейм «Components» (расширение). Этот файл — индекс: при добавлении компонента в Figma сюда добавляется строка, иначе следующая сборка экрана не найдёт компонент.

## Действия

### Button
- **Назначение:** основное интерактивное действие (подтвердить, отменить, отклонить)
- **Варианты:** `Type=Primary|Secondary|Ghost` × `State=Default|Hover|Disabled` × `Size=Sm|Md|Lg` — полная сетка 3×3×3 = 27 ячеек
- **Node ID:** `18:280`
- **Размеры:** Sm — padding `space-3`/`space-2` (117×37); Md — padding `space-4`/`space-3` (125×45, исходный); Lg — padding `space-6`/`space-4` (141×53). Радиус везде `radius-sm`, текстовый стиль везде `DS/Body/sm Medium` (14px) — размер кнопки меняется только отступами, отдельного крупного текстового стиля под Lg в Foundation нет (сознательное ограничение, не заводили новый TextStyle в этой директиве)

> Расширено в component_variants: добавлены состояния Hover/Disabled к каждому type (Semantic: surface-action-secondary-hover). Ось `Size` добавлена в 2 прогона: прогон 1 — `Md` проставлен на все 9 существующих ячеек (Node ID не менялись, старые инстансы не задеты); прогон 2 — клонированы `Sm`/`Lg` для каждой из 9 комбинаций Type×State (+18 ячеек). Новых Semantic-токенов не потребовалось.
- **Used in:** screens/case-detail (`Size=Md`), screens/landing (`Size=Md`), screens/login (`Size=Md`), screens/case-detail-rejected (`Type=Ghost, Size=Md`)

### IconButton
- **Назначение:** квадратная кнопка под одиночную иконку
- **Варианты:** `State=Default|Hover|Disabled` (3 ячейки)
- **Node ID:** `46:130`

> Расширено в component_variants: промоутирован из одиночного Component в ComponentSet, добавлены Hover/Disabled.
- **Used in:** (нет) — **Status:** screens_audit 2026-09-10, оставлен осознанно. Не используется ни на одном экране, но решение — сохранить в каталоге, не удалять

## Ввод

### Input
- **Назначение:** однострочное текстовое поле ввода
- **Варианты:** `State=Default|Error|Hover|Focus|Disabled` (5 ячеек)
- **Node ID:** `18:287`

> Расширено в component_variants: добавлены Hover/Focus/Disabled. Новый Semantic: border-focus-ring.
- **Used in:** screens/login (первое реальное использование в проекте — State=Default и State=Error)

### Dropdown
- **Назначение:** поле выбора одного значения из списка — для FilterBar (тир, статус, сортировка)
- **Варианты:** `State=default`, `State=open`
- **Node ID:** `30:164`
- **Used in:** screens/case-queue, screens/confirmation-queue

## Контейнеры

### Card
- **Назначение:** контейнер с заголовком и телом для сгруппированного контента
- **Варианты:** `State=Default|Hover|Selected` (3 ячейки)
- **Node ID:** `46:140`

> Расширено в component_variants: промоутирован из одиночного Component в ComponentSet, добавлены Hover/Selected. Новый Semantic: surface-selected.
- **Used in:** (нет — см. «известный пробел каталога» ниже) — **Status:** screens_audit 2026-09-10, оставлен осознанно

### Modal
- **Назначение:** диалоговое окно: заголовок + тело + кнопки подтверждения/отмены
- **Варианты:** — (один вариант)
- **Node ID:** `14:320`
- **Used in:** (нет) — **Status:** screens_audit 2026-09-10, оставлен осознанно. Ни один собранный экран пока не требует модального окна

## Навигация

### Navbar
- **Назначение:** горизонтальная панель навигации: лого, разделы, аватар
- **Варианты:** — (один вариант)
- **Node ID:** `14:327`
- **Used in:** (нет) — **Status:** screens_audit 2026-09-10, оставлен осознанно. Все экраны собирают Header локальной композицией (логотип-слот + заголовок/breadcrumb + Avatar), а не инстансом Navbar — паттерн Header оказался специфичнее, чем предполагал базовый Navbar

### Tabs
- **Назначение:** переключение между разделами контента на одном экране
- **Варианты:** `Active=None|First|Second`, `Size=Sm|Md` (6 ячеек)
- **Node ID:** `181:182`
- **Used in:** screens/case-history (`Active=Second, Size=Md`), screens/case-detail (`Active=First, Size=Md`) — обе вкладки связаны Figma-прототипом (клик по «История»/«Сводка» переключает экран)

> Расширено в component_variants: ось `State=default|active` (не различала, какая вкладка активна) заменена на `Active=None|First|Second` × добавлена ось `Size=Sm|Md`. Пробел, найденный на `screens/case-history` (нельзя было подсветить именно вторую вкладку), закрыт. Новых Semantic-токенов не потребовалось — используются существующие `text-default`, `text-muted`, `surface-action-primary`.

### Breadcrumb
- **Назначение:** путь по иерархии экрана (раздел / объект)
- **Варианты:** — (два состояния сегмента: default / current, без отдельных Figma-вариантов)
- **Node ID:** `32:128`
- **Used in:** screens/case-detail, screens/case-history, screens/case-detail-rejected

## Фидбэк

### Toast
- **Назначение:** всплывающее уведомление о результате действия (например, после решения по кейсу)
- **Варианты:** `Variant=success`, `Variant=warning`, `Variant=error`, `Variant=info`
- **Node ID:** `31:157`
- **Used in:** (нет) — **Status:** screens_audit 2026-09-10, оставлен осознанно. Уведомления после действия (подтвердить/отклонить/эскалировать) в собранных экранах пока не смоделированы как отдельное состояние

## Данные

### Badge
- **Назначение:** статус-метка (риск-тир, состояние кейса)
- **Варианты:** `Variant=Success|Warning|Error|Info`, `Size=Md|Sm` (8 ячеек)
- **Node ID:** `18:296`

> Расширено в component_variants: добавлена ось Size (Sm — компактный вариант для таблиц).
> Screens_audit 2026-09-01: Size=Sm фактически не использовался нигде до этой правки — CaseQueueRow был собран на Size=Md. Переключён на Sm во всех вхождениях (CaseQueue ×7, Landing ×3).
- **Used in:** screens/case-queue, screens/case-detail, screens/landing, screens/case-detail-rejected (`Variant=Error, Size=Md`)

> **Table** (был `30:144`) удалён в final_screens: устарел (3 запечённые колонки под старую версию wireframe), а Figma Plugin API не позволяет добавлять произвольных детей в instance — универсальный «пустой ряд» физически не работает. Взамен под каждый реальный набор колонок собирается свой Header/Row-компонент с уже запечёнными ячейками (см. CaseQueueRow, ConfirmationRow ниже).

## Особенные

### RiskIndicator
- **Назначение:** визуальный индикатор риск-тира кейса — форма + подпись, тир не кодируется только цветом
- **Варианты:** `Tier=High|Medium|Low` (3 ячейки)
- **Node ID:** `61:136`

> Вынесено в final_screens (Фаза 2.5): 13 повторяющихся вхождений на CaseQueue/CaseDetail/ConfirmationQueue.
- **Used in:** screens/case-queue, screens/confirmation-queue, screens/case-detail, screens/landing, screens/case-detail-rejected

### Avatar
- **Назначение:** визуальное представление пользователя в Header
- **Варианты:** `State=Default` (один вариант)
- **Node ID:** `61:139`

> Вынесено в final_screens (Фаза 2.5): использовался в Header всех 3 экранов, в каталоге отсутствовал.
- **Used in:** (нет) — **Status:** screens_audit 2026-09-10 (повтор), оставлен осознанно. Проверка Figma-дерева показала: слот аватара во всех 6 Header-ах (`case-queue`, `confirmation-queue`, `case-detail`, `case-history`, `case-detail-rejected`, `case-queue-empty`) — это не instance компонента, а вручную собранный Lucide-фрейм `user-round-arrow-left` (иконка человечка вместо цветного кружка). Прежняя запись Used-in была неверна и зафиксирована здесь как факт истории, а не текущее состояние; катaлог оставлен без изменений — иконка визуально лучше вписывается в строгий тон Header, чем цветной Avatar-кружок

### CaseQueueHeader
- **Назначение:** строка заголовков колонок таблицы очереди кейсов
- **Варианты:** — (один вариант)
- **Node ID:** `64:131`
- **Used in:** screens/case-queue, screens/landing

### CaseQueueRow
- **Назначение:** строка кейса в очереди (риск-тир, заявитель, статус, SLA, дата, расхождение источников)
- **Варианты:** `State=Default|Hover` (2 ячейки)
- **Node ID:** `64:158`
- **Used in:** screens/case-queue, screens/landing

### ConfirmationHeader
- **Назначение:** строка заголовков колонок таблицы эскалаций
- **Варианты:** — (один вариант)
- **Node ID:** `72:137`
- **Used in:** screens/confirmation-queue

### ConfirmationRow
- **Назначение:** строка эскалированного кейса (риск-тир, заявитель, эскалировал, заметка, дата, время ожидания)
- **Варианты:** `State=Default|Hover` (2 ячейки)
- **Node ID:** `72:160`
- **Used in:** screens/confirmation-queue

### AccordionRow
- **Назначение:** свёрнутая по умолчанию секция прогрессивного раскрытия
- **Варианты:** — (один вариант; Expanded — кандидат для будущего component_variants)
- **Node ID:** `75:137`
- **Used in:** screens/case-detail, screens/landing (Hero mini-карточка, FAQ), screens/case-detail-rejected

### Card — известный пробел каталога
- У ComponentSet `46:140` нет варианта `State=Default`, только `Hover`/`Selected`. Анатомия жёстко запечена (заголовок + описание, 2 текстовых слоя без слотов под Badge/иконки) — обнаружено при сборке `screens/landing`, где карточки со статистикой/бейджами пришлось строить как локальные композиции вместо инстансов Card. См. `ds/screens/landing.md` → «Локальные композиции».

## Как добавить компонент

См. `ds/CONTRACT.md` → «Что делать, если нужного нет» → «Нет компонента под задачу».
