# Полный список фич и требований

Собрано из: `brief.md`, `competitive_analysis_final.md` (+ `competitor_features.md`, `competitor_ux_patterns.md`), `audit/audit_report.md`, `personas.md`, `interview_compliance_officer.md`.

| # | Фича | Описание | Источник | Критична для |
|---|---|---|---|---|
| 1 | KYC / ID-верификация | Проверка личности через Sumsub — базовый источник данных для кейса | brief.md | Compliance Officer |
| 2 | AML / санкции / PEP screening | Скрининг по санкциям/PEP через ComplyAdvantage | brief.md | Compliance Officer |
| 3 | Внутренний поведенческий скоринг | Третий источник риск-данных — собственная модель на поведении клиента | brief.md | Compliance Officer |
| 4 | Матрица риск-тиров (Low/Medium/High) с эскалацией | Явный UI-паттерн, определяющий, кто и как решает конфликт product/compliance по уровню риска | brief.md, competitive_analysis_final.md (дифференциатор — ни у кого из 5 конкурентов нет) | Compliance Officer, CPO |
| 5 | Auto-одобрение Low с фиксацией в аудит-логе | Low-риск закрывается без участия человека, но с обязательной записью | brief.md, interview_compliance_officer.md | Compliance Officer |
| 6 | Soft-block Medium с SLA | Кейс на паузе до ревью в рамках SLA | brief.md | Compliance Officer |
| 7 | Жёсткое вето High | Кейс не проходит без явного одобрения compliance | brief.md | Compliance Officer |
| 8 | 4-eyes: роль Senior Compliance Officer + статус «Ожидает подтверждения» | Формализованная эскалация при несогласии с AI-вердиктом | brief.md, competitive_analysis_final.md (дифференциатор), personas.md, interview_compliance_officer.md | Senior Compliance Officer |
| 9 | Состояния кейса (Новый → На проверке → RFI → Эскалация → Ожидает подтверждения → Approved/Rejected → re-review) | Полный жизненный цикл кейса | brief.md | Compliance Officer |
| 10 | Экран разбора кейса с прогрессивным раскрытием | Сводка + риск-скор сразу, детали (документы, история, санкции) по клику | brief.md, personas.md | Compliance Officer |
| 11 | Explainability-блок AI-вердикта в карточке | Версия модели + входные данные, видны сразу, не в отдельном отчёте | brief.md, competitive_analysis_final.md (дифференциатор), deep_research_results.md (EU AI Act ст.11/13) | Compliance Officer, Senior Compliance Officer |
| 12 | Явный показ расхождения источников | Sumsub vs ComplyAdvantage не усредняются в один скор, а показаны как отдельный элемент | brief.md, competitive_analysis_final.md (дифференциатор) | Compliance Officer |
| 13 | Аудит-лог (кто/когда/что + версия модели/входные данные) | Включая авто-одобрения Low; 5-летнее tamper-evident хранение | brief.md, deep_research_results.md (AMLR ст.77) | Compliance Officer, Senior Compliance Officer |
| 14 | Accessibility WCAG 2.1 AA + риск не только цветом | Уровень риска дублируется подписью и формой/иконкой | brief.md, audit/audit_report.md (находка #2 — конфликт цвета/иконки у конкурента) | Compliance Officer |
| 15 | Дизайн-система с нуля | Готовой DS нет, компоненты создаются в рамках проекта | brief.md | Инфраструктурная (все роли) |
| 16 | Confirm-диалог перед значимыми решениями | Подтверждение для решений на High-anomaly кейсах, синхронизировано с риск-тиром | audit/audit_report.md (находка #3) | Compliance Officer |
| 17 | Полный список правил (сработавших и несработавших) в карточке | Не только «3/60», а доступ ко всем правилам для сверки | audit/audit_report.md (находка #5), deep_research_results.md (AMLR traceability) | Compliance Officer, Senior Compliance Officer |
| 18 | Три статуса решения в аудит-логе (авто-правило / human-review / unilateral-timeout) | Различать честно, кто реально принял решение | interview_compliance_officer.md | Compliance Officer, Senior Compliance Officer |
| 19 | Лёгкий паттерн «второе мнение» (без формального 4-eyes) | Одна кнопка, без выбора получателя/обязательного текста — иначе officer уйдёт в Slack | interview_compliance_officer.md | Compliance Officer |
| 20 | Маршрутизация эскалации на роль/группу, не фиксированного человека | Учитывает недоступность конкретного Senior Compliance Officer | interview_compliance_officer.md | Compliance Officer, Senior Compliance Officer |
| 21 | SLA-таймер эскалации с видимым обоснованием | Настраиваемый по риск-тиру, business-hours aware | interview_compliance_officer.md | Senior Compliance Officer |
| 22 | Явная эскалация выше по цепочке при истечении SLA | Не тихий дефолт-статус, а видимая пометка «просрочено» | interview_compliance_officer.md | Senior Compliance Officer |
| 23 | Пассивный индикатор «Ожидает подтверждения» | Бейдж/уведомление, не блокирующий модальный экран | interview_compliance_officer.md | Compliance Officer |
| 24 | Очередь кейсов сворачивает Low-риск по умолчанию | Снижает alert fatigue от 90–95% false positive шума | personas.md, deep_research_results.md | Compliance Officer |
| 25 | Дашборд CPO с одним главным CTA-показателем | «% сигналов, заблокировавших онбординг >24ч» вместо равнозначных виджетов | personas.md, audit/audit_report.md (находка #6 — перегруженный Overview у конкурента) | CPO |
| 26 | Override rate по флагу + onboarding conversion на одном экране | Связывает OKR брифа для CPO-персоны | brief.md (OKR), personas.md | CPO |
| 27 | Виджет прогноза счёта / алерты 50/75/90% usage | Защита от bill shock — 78% IT-лидеров сталкивались с неожиданными счетами | deep_research_results.md, competitor_ux_patterns.md, personas.md | CPO |
| 28 | Перевод compliance-метрик на язык бизнеса для CPO | Override rate/FP rate объясняются простым языком, не AML-жаргоном | personas.md | CPO |
| 29 | Метрики OKR: Time-to-decision по тирам, False positive rate | Базовый трекинг для оценки продукта | brief.md | CPO, Compliance Officer |
| 30 | Read-only импорт исторических кейсов при миграции | Снимает страх разрыва аудит-следа при смене вендора | personas.md | Compliance Officer |
| 31 | No-code конструктор риск-правил | Отраслевой стандарт — есть у всех 5 конкурентов | competitive_analysis_final.md, competitor_ux_patterns.md | Compliance Officer |
| 32 | Непрерывный (perpetual) мониторинг вместо только периодического re-review | Отраслевой тренд, требование FATF Rec.10/AMLR | deep_research_results.md, competitor_features.md | Compliance Officer |
| 33 | Публикация override rate как метрики-дифференциатора | Индустриального бенчмарка не существует ни у кого — можем задать категорию | competitor_ux_patterns.md | CPO (позиционирование) |
| 34 | Self-serve вход / публичная цена | Открытый GTM-вопрос, не решён в брифе | competitive_analysis_final.md | CPO |
| 35 | Облегчённый demo-дашборд с примерными цифрами до контакта с sales | Снижает барьер пробы для CPO без sales-цикла | personas.md | CPO |
| 36 | Free tier / программа дешёвого входа для ранних стартапов | Near-standard — есть у 3 из 5 конкурентов | competitor_ux_patterns.md | CPO |
| 37 | DORA-готовность (реестр контрактов, отчётность об инцидентах) | Мы как SaaS-вендор для финансовых entities — ICT-третья сторона | deep_research_results.md, competitive_analysis_final.md | Организационное требование, не персона |
| 38 | Кастомизация риск-матрицы под юрисдикцию/лицензию | Архитектурно заложено в брифе, явно вне скоупа MVP | brief.md | Будущие enterprise-клиенты |

## Явно исключено из продукта (не входит в MoSCoW)

- **Согласия на обработку данных GDPR/PDPA** — собираются на стороне клиента платформы, это не наш продукт (brief.md, п.6).
- **История экспорта/доступа к данным** — отдельная подсистема платформенной безопасности (brief.md, п.6).
