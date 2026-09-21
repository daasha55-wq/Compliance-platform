# Screens index

- `case-queue.md` — очередь кейсов, обзор и приоритизация по риск-тиру и SLA (Compliance Officer)
- `confirmation-queue.md` — кейсы, эскалированные через 4-eyes, финальное решение (Senior Compliance Officer)
- `case-detail.md` — карточка кейса: сводка → explainability → аккордеон деталей → решение по риск-тиру (Compliance Officer)
- `landing.md` — маркетинговый лендинг: Hero → Problem → Regulatory → Differentiators → How it works → Roles → Trust → Pricing → FAQ → Final CTA → Footer
- `login.md` — аутентификация, определение роли; первое реальное использование компонента Input
- `case-history.md` — read-only аудит-лог кейса, вынесен в отдельный экран из сценария case-review; обнаружен пробел в Tabs (нет варианта «активна вторая вкладка»)
- `case-detail-rejected.md` — отказной исход кейса (продолжение случая из confirmation-queue) — закрывает пробел «в наборе только happy path»
- `case-queue-empty.md` — очередь кейсов без данных, вынесена в отдельный видимый экран из скрытого `EmptyState` внутри case-queue
