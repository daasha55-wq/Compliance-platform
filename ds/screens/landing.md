# Screen: Landing

**Content source:** `landing_page_spec.md`
**Figma section:** SectionNode «landing» (`103:167`), страница «Wireframes»
**Final Screen Node ID:** `107:289` (`Screen/Landing`, 1440 × 6041, HUG-высота — маркетинговая страница, не фикс-высота приложения)

## Composition

12 секций, VERTICAL auto-layout, каждая FILL-ширина / HUG-высота:

1. **Header** (`107:290`) — бренд-марка + название, 4 nav-ссылки, Button instance (Primary) «Запросить демо»
2. **Hero** (`107:291`) — 2 колонки: слева заголовок/подзаголовок/CTA, справа мок карточки кейса (Badge, RiskIndicator, 2×AccordionRow, 3×Button instances)
3. **Problem** (`107:292`) — 4 карточки статистики (локальная композиция, не Card-компонент — см. примечание ниже)
4. **Regulatory** (`107:293`) — 3 строки закона (Badge instances) + закрывающий блок на `surface-selected`
5. **Differentiators** (`107:294`) — заголовок таблицы + 4 строки («У нас» / «На рынке» / «Что требует закон»), с RiskIndicator/Badge instances как визуальное доказательство
6. **HowItWorks** (`107:295`) — 3 карточки риск-тира (RiskIndicator instances) + мок-таблица CaseQueue (реальные CaseQueueHeader/CaseQueueRow instances с swapComponent на нужный Tier/Badge)
7. **Roles** (`107:296`) — 3 карточки роли (Badge instances), последняя помечена как ссылка на роадмап v1.1
8. **Trust** (`107:297`) — слева карточка аудит-лога с мок-таблицей, справа 3 карточки статуса (Badge instances: Интеграция / В процессе ×2)
9. **Pricing** (`107:298`) — слева CTA (Button instance), справа 2 карточки (модель + bill-shock с прогресс-баром)
10. **FAQ** (`107:299`) — 5 × AccordionRow instances (только заголовки — компонент не поддерживает раскрытое содержимое, см. `case-detail.md`)
11. **FinalCTA** (`107:300`) — фон `surface-action-primary`, Button instance (Secondary — читается как «инвертированная» кнопка на акцентном фоне)
12. **Footer** (`107:301`) — 4 колонки ссылок + примечание о юрисдикциях

## Фон секций (чередование)
Страница — `surface-subtle` (root, `107:289`). Поверх неё секции чередуются:
- **Прозрачные** (просвечивает серый фон страницы): Hero, Regulatory, HowItWorks, Trust, FAQ, Footer
- **Белые с рамкой** (`surface-default` + hairline `border-default` сверху/снизу): Problem, Differentiators, Roles, Pricing
- **Header** — белый + hairline снизу
- **FinalCTA** — `surface-action-primary` (акцентный синий)

Без этого чередования все 12 секций были залиты одинаковым белым, из-за чего границы карточек внутри секций визуально пропадали — это и было причиной правки после первой сборки.

## Переиспользованные компоненты
Button (`18:280`), Badge (`18:296`), RiskIndicator (`61:136`), AccordionRow (`75:137`), CaseQueueHeader (`64:131`), CaseQueueRow (`64:158`) — все как в `ds/components.md`, без изменений анатомии.

## Локальные композиции (не компоненты)
Карточки статистики/дифференциаторов/ролей/trust построены как одноразовые auto-layout фреймы с привязкой к тем же Semantic-токенам (`surface-default`, `border-default`, `radius-md`, `space-6`), а не через компонент **Card** (`46:140`).

**Причина:** анатомия Card — жёстко запечённые 2 текстовых слоя (заголовок + описание), без слотов под Badge/RiskIndicator/произвольный список. Instance API не позволяет добавлять детей в инстанс (см. ограничение, задокументированное в `ds/components.md` про Table), поэтому контент с иконками/бейджами внутри карточки физически не помещается в существующий Card. Использован только визуальный контракт токенов, не сам компонент.

**Также обнаружено:** у ComponentSet Card (`46:140`) отсутствует вариант `State=Default` — только `Hover`/`Selected`. Это отдельный, более ранний пробел каталога (не связан с лендингом), не блокирует текущую сборку — стоит закрыть отдельной итерацией `component_variants`, если Card понадобится как реальный переиспользуемый контейнер.

## Tokens used
- Цвета: `surface-default`, `surface-subtle`, `surface-selected`, `surface-action-primary`, `text-default`, `text-muted`, `text-on-action`, `border-default`
- Отступы: `space-2`–`space-16` (по масштабу, не везде забиндены как Variables — см. примечание о темпе сборки)
- Typography: Inter Regular/Medium/Semi Bold, размеры 12–44px по шкале `size-*`

## Известные ограничения этого прогона
- Радиусы и отступы у локальных композиций заданы числовыми литералами по шкале токенов, не все через `setBoundVariable` — приемлемо для одноразовых маркетинговых блоков, но при переносе в постоянный UI-кит стоит забиндить.
- FAQ и Hero-аккордеоны показывают только заголовок (без текста раскрытия) — ограничение самого компонента AccordionRow, а не решение для лендинга.
