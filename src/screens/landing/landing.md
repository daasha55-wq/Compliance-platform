# Landing

- **Роут:** `/screens/landing`
- **Источник:** `landing_page_spec.md` (копирайт) + `ds/screens/landing.md` (структура/композиция). **Figma-фрейм `107:289` не найден через MCP** (metadata/design_context/screenshot все вернули "node not found") — вероятно, удалён или переименован после написания доки. Экран собран из текстовых спецификаций, не сверен визуально с текущим Figma.
- **Из базы:** Button, Badge, RiskIndicator, AccordionRow, CaseQueueHeader, CaseQueueRow
- **Локальные блоки:** свой Header (не AppShell — лендинг без Sidebar), 12 секций как одноразовые композиции на токенах (Hero card, статкарточки, regulatory rows, differentiator cards, role cards, trust cards, pricing cards) — см. `ds/screens/landing.md` → «Локальные композиции» (компонент Card не подходит по анатомии)
- **Mock:** HowItWorks-таблица и Trust-аудит-лог — иллюстративные строки в духе CaseQueue/CaseHistory, не 1:1 копия другого экрана
- **Рекомендация:** когда фрейм в Figma найдётся/восстановится — перезапустить эту директиву на экран, чтобы сверить визуально
