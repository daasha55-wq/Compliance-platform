# Глубокое исследование рынка и конкурентной среды

## Compliance-платформа для финтех-стартапов (KYC / AML / санкции / GDPR-PDPA)

Подготовлено: 21 августа 2026 · Источник контекста: `brief.md`, `competitive_analysis.md`

## TL;DR

- Ниша растёт двузначными темпами (CAGR ~15–20% для KYC/IDV и RegTech), и в 2026–2027 открывается «регуляторное окно обязательного спроса» — EU AI Act (high-risk обязательства с 2 августа 2026) и AMLR (единый рулбук ЕС с 10 июля 2027) делают объяснимость, human oversight и аудит-лог не «хорошей практикой», а требованием закона. Это прямой попутный ветер для нашего продукта.
- Системная боль пользователей неизменна годами: 90–95% алертов — false positives, аналитики выгорают, доказательства для аудита собираются вручную, AI-вердиктам не доверяют без объяснимости. Именно это адресуют наши риск-тиры, 4-eyes, explainability-блок в карточке и явный показ расхождения источников вместо усреднения.
- Главный риск нашей модели seats + usage overage — непредсказуемость счёта (bill shock): 78% IT-лидеров сталкивались с неожиданными счетами от consumption-моделей. Без прозрачного метринга, дашбордов и алертов overage провоцирует отток, поэтому «предсказуемость счёта» должна стать отдельным продуктовым OKR.

## Ключевые выводы

1. Рынок KYC/AML/IDV и RegTech растёт CAGR ~15–20%, но абсолютные оценки радикально расходятся между аналитическими домами из-за разных определений рынка — использовать диапазоны, не единые числа.
2. Регуляторика — главный драйвер спроса: EU AI Act относит AML-риск-профилирование и кредитный скоринг к high-risk с обязательствами по human oversight, логированию и объяснимости с 2 августа 2026.
3. AMLR (10 июля 2027) вводит единый рулбук ЕС и юридически чёткий 5-летний срок хранения аудит-следа (ст. 77).
4. GDPR ст. 22 + дело SCHUFA (C-634/21) означают, что «резиновый штамп» человека не считается разрывом цепочки автоматизированного решения — нужен реальный override. Это напрямую валидирует наш 4-eyes и запрет override в одно действие.
5. Тренд perpetual KYC вытесняет периодические re-review — наш периодический re-review нужно дополнить событийным непрерывным мониторингом.
6. Боль пользователей за годы: false positives 90–95%, alert fatigue, выгорание, ручной сбор доказательств, недоверие к AI, расхождение данных провайдеров.
7. Экономика usage-based: выше NRR (медиана ~120%), но риск bill shock; предсказуемость счёта — критичный фактор удержания.
8. Бенчмарки OKR: FP rate 90–95%, time-to-decision 20–40 мин/алерт, KYC drop-off 20–68%; override rate — публичного AML-бенчмарка не существует (важный пробел).

## 1. Рынок

### Общий размер и динамика

Оценки сильно зависят от определения рынка (чистый KYC vs identity verification vs весь RegTech):

| Сегмент | Оценка | CAGR | Источник |
|---|---|---|---|
| Identity verification | $14.34 млрд (2025) → $29.32 млрд (2030) | 15.4% | MarketsandMarkets |
| AML | $4.13 млрд (2025) → $9.38 млрд (2030) | 17.8% | MarketsandMarkets |
| KYC | $6.73 млрд (2025) → $16.31 млрд (2031) | 15.88% | Mordor Intelligence |
| KYC/ID (альт. оценка) | $9.5 млрд (2024) → $22.8 млрд (2033) | 10.3% | Verified Market Reports |
| RegTech | $20.67 млрд (2025) → $44.11 млрд (2030) | 16.37% | Mordor Intelligence |
| RegTech (альт.) | $23.43 млрд (2026) → $105.23 млрд (2034) | 20% | Fortune Business Insights |
| RegTech (альт.) | $18.84 млрд (2025) → $38.44 млрд (2030) | 15.2% | The Business Research Company |
| RegTech (альт.) | $17.12 млрд (2025) → $99.07 млрд (2034) | 21.5% | Polaris |

По KYC: Северная Америка — 34.1% выручки в 2025, APAC — самый быстрый CAGR 18.05% (Mordor).

Причина разброса по RegTech — разные определения: только ПО vs ПО + услуги; финсектор vs все отрасли. **Все синдицированные оценки коммерческие, не независимые и не регуляторные.**

### Подсегменты

- **Transaction monitoring** — крупный отдельный сегмент (историческая оценка MarketsandMarkets: $8.3 млрд 2018 → $16.8 млрд 2023, CAGR 15.1%).
- **KYB** — быстрорастущий, но плохо измеренный подсегмент. Оценки базы 2024 расходятся от ~$3.7 млрд (Dataintelo, CAGR 18.2%, APAC самый быстрый регион CAGR 21.3%) до $4.8 млрд (Growth Market Reports, CAGR 16.2%). Узкий E-KYB — $366 млн (2024) → $741.6 млн (2030), CAGR 12.5% (Global Industry Analysts). Разброс огромный — использовать строго как диапазон.

### Сколько тратят на compliance

LexisNexis *True Cost of Financial Crime Compliance* (2023, проведён Forrester, опрос 1181 старшего руководителя):

- Глобальные затраты финансовых институтов — **$206.1 млрд** (эквивалент более 12% мировых R&D-расходов).
- По регионам: EMEA $85 млрд, APAC $45 млрд, US/Canada $61 млрд.
- Рост затрат зафиксирован у 98–99% организаций; 70–81% приоритизируют сокращение costs на ближайшие 12 месяцев.
- В APAC труд — 41%, технологии — 32% затрат (Китай ~$20.4 млрд, Япония ~$17.8 млрд).

**Для растущих финтехов это означает:** compliance-бюджет — крупная и растущая статья, где ценится именно снижение операционных затрат (headcount, время на алерт), а не «ещё одна фича».

### Эрозия цены за верификацию (критично для нашей usage-модели)

Juniper Research (через Biometric Update, дек. 2024): средняя цена digital IDV **$0.20 (2025) → $0.17 (2029), −15%** глобально. Северная Америка −23% (с ~$0.28 до $0.21); Западная Европа −19% (до $0.19, отчасти из-за внедрения EU Digital Identity Wallets). При этом совокупные траты на IDV, по проекции, вырастут на 74% до $26 млрд.

Текущие рыночные диапазоны за проверку (Fintechspecs, 2025): $0.50–$7.00 в зависимости от типа; стандартный API-стек identity + document ~$1.50–$3.50; database-only $0.50–$1.50. Объёмные скидки начинаются от 10–12 тыс. проверок/мес, до −20–40% на тире 50 тыс.+.

**Вывод для unit-экономики:** цена за верификацию структурно снижается, поэтому overage-компонент нельзя строить только на per-check марже — она эродирует.

## 2. Тренды и регуляторика как драйвер продукта

### EU AI Act — прямое обоснование нашей архитектуры

AML-риск-профилирование, кредитный скоринг, fraud detection и автоматизированные решения о доступе к финуслугам классифицированы как high-risk (Annex III, п. 5(b)).

Обязательства: risk management (ст. 9), data governance (ст. 10), техническая документация (ст. 11), прозрачность для деплойеров (ст. 13), **human oversight (ст. 14)**, точность/робастность (ст. 15), логирование и post-market monitoring.

- Дата вступления high-risk обязательств — **2 августа 2026**.
- Штрафы — до €35 млн или 7% глобального оборота.
- **Область изменений:** Европарламент 18 июня 2026 проголосовал за поправки к срокам (423 за, 57 против) — часть дедлайнов сдвинута; финальные даты уточнять по официальным публикациям.

Ключевое требование, совпадающее с брифом: каждое AI-решение должно иметь audit trail, который может проследить человек и регулятор. Модель, выдающая скор без показа входных данных и логики, требованиям не соответствует.

### AMLR / AMLD6 / AMLA

- **AMLR** (Regulation EU 2024/1624) — единый directly-applicable рулбук, применяется с **10 июля 2027**; убирает национальные расхождения в CDD/PEP/порогах.
- **AMLA** (Франкфурт) операционна с 1 июля 2025; прямой надзор до ~40 крупнейших высокорисковых entities с 1 января 2028; публикует 23 RTS/ITS в течение 2026 (большинство к 10 июля 2026 — поэтому «2026 — год действий»).
- **Аудит-лог (ст. 77 AMLR):** обязательны записи оценки подозрительной активности (какая информация учтена, результат, копия отчёта) плюс подтверждающие транзакционные данные. Единый **5-летний срок хранения** от релевантного события, после чего данные удаляются — бессрочное хранение запрещено.
- В США BSA — тоже 5 лет (31 CFR); санкционные записи OFAC — до 10 лет. Аудит-след требуется tamper-evident (хеширование / подписи).

### DORA

Regulation (EU) 2022/2554, применяется с 17 января 2025. Требования: ICT-риск-менеджмент, тестирование устойчивости, надзор за ICT-третьими сторонами, реестр контрактов, отчётность об инцидентах. Штрафы до 10% годового оборота.

**Как SaaS-вендор для финансовых entities мы попадём под требования к ICT-третьим сторонам** — каскадные контрактные обязательства, отчётность об инцидентах. Это нужно заложить в договоры и SLA.

### GDPR ст. 22 + SCHUFA

CJEU в деле C-634/21 (7 декабря 2023) постановил: кредитный скоринг — автоматизированное решение по ст. 22, даже если финальное решение принимает третья сторона. «Solely automated» включает формальный человеческий sign-off, если у ревьюера нет реальной власти отменить (Recital 71 прямо упоминает право на объяснение). EDPB требует, чтобы автоматизированная обработка была именно необходимой, а не просто удобной.

**Прямое следствие для нас:** авто-одобрение Low-риска должно иметь легальное основание и логироваться; человек в 4-eyes обязан иметь реальную власть override, а не быть «резиновым штампом». GDPR ст. 22 и EU AI Act ст. 14 кумулятивны — применяются одновременно.

### Perpetual KYC

Индустрия переходит от периодических re-review к непрерывному событийному мониторингу (Fenergo, Capgemini, SymphonyAI, Quantexa, Consilient). FATF Rec. 10 и AMLR требуют ongoing monitoring. По опросу SymphonyAI FinCrime Frontier 2025–26, модернизация KYC-операций (включая pKYC) — среди топ-желаемых AI-исходов, второе место после снижения false positives.

Более продвинутый pKYC переоценивает риск на уровне поведения клиента, а не просто перепроверяет идентичность — это совпадает с нашим внутренним поведенческим скорингом.

### PDPA в APAC

- **Сингапур:** PDPA требует уведомления о значимых автоматизированных решениях; есть AI Verify и Model AI Governance Framework, MAS FEAT Principles (с 2018). Штрафы до SGD 1 млн или 10% местного оборота; уведомление о брешах в 3 календарных дня.
- **Малайзия:** с 30 апреля 2026 гайдлайны по ADMP (automated decision-making and profiling) делают DPIA качественным триггером до запуска систем. Штрафы до RM1 млн, DPO обязателен, уведомление о брешах в 72 часа.
- **Таиланд:** PDPA (по образцу GDPR) требует уведомления об автоматизированной обработке.

Общий вектор — сближение с GDPR, что делает наш GDPR-first дизайн переносимым в APAC с локальными надстройками. Data residency: Малайзия / Индонезия / Вьетнам требуют локализации, Сингапур / Таиланд — нет.

## 3. Пользователи и их боль (устойчивые многолетние паттерны)

### False positives и alert fatigue

Устойчивый многолетний паттерн: **90–95% AML-алертов — false positives** (оценка PwC, цитируемая в индустрии с 2017–2018; воспроизводится Flagright, Facctum, Alessa, DataVisor). В санкционном скрининге — до 99% (Electronic Payments International).

Независимый регуляторный тест: шведский Finansinspektionen проверил 19 банков на 5000 именах из списков UN/EU в 2024 — средняя точность матчинга 97.2%, но ни один банк не поймал все имена. FATF: только 16% стран показывают существенную эффективность в таргетированных финсанкциях.

### Стоимость и время разбора

- Cost per alert $25–$50 (mid-size институты, практические оценки 2024); отдельные оценки дают $15–$100.
- Время разбора одного алерта — **20–40 минут** (FluxForce), ~30 минут в модели Facctum.
- SAR обходится в $1,000–$5,000 (CalcBee).
- До 90% времени compliance-команд уходит на алерты, не приводящие к действию (Facctum).
- Индустриальная оценка: false-positive-расследования стоят ~$3 млрд/год.

### Выгорание и текучесть

Прямых цифр строго по AML-аналитикам мало — осторожность при экстраполяции. Смежная область SOC/fraud: 63% (Tines 2023) – 76% (Sophos 2025) аналитиков сообщают о выгорании; Microsoft — 35% говорят, что рутинный triage напрямую усилил выгорание, 75% не имеют времени на проактивную работу.

Flagright напрямую описывает alert fatigue у compliance-персонала, проблему «иголки в стоге сена» (9 из 10 алертов ложные) и потерю институционального знания при уходе аналитиков.

### Недоверие к AI и объяснимость

Академические и отраслевые источники (CFA Institute 2025, FinTech Global 2026, arXiv, Springer Journal of Business Ethics 2026) сходятся: объяснимость повышает доверие и приемлемость AI-вердиктов, причём люди терпимее к ошибкам модели, когда процесс прозрачен и его можно оспорить (procedural justice). XAI снижает false positives и повышает доверие аналитиков.

FinTech Global (2026) формулирует требование, прямо совпадающее с нашим брифом: если compliance-офицер не может ясно объяснить, почему достигнут конкретный результат, этот результат не должен стоять — и override человека, и одобрение менеджера должны логироваться.

### Жалобы на конкретные продукты (устойчивые паттерны G2 / Trustpilot)

- **ComplyAdvantage:** повторяющиеся жалобы на false positives (в агрегации G2 — 7 упоминаний «False Positives» и 7 «Data Inaccuracy»), «clunky UI», сложность кастомизации/API, битые и неполные ссылки на источники adverse media (приходится догугливать в open source).
- **Sumsub:** 488 отзывов, средняя ~3.9/5 (rfp.wiki). Хвалят скорость и глобальное покрытие; ругают цену для малого бизнеса, длительный онбординг/имплементацию, глубину first-line поддержки и UI для глубокого EDD.

**Расхождение данных разных провайдеров и ручное подтверждение hit'ов — системная боль,** которую напрямую адресует наш явный показ расхождения источников вместо усреднения.

## 4. Конкуренты и экономика ценовых моделей

### Поведение моделей монетизации

Usage-based даёт более высокий NRR — медиана **~120%** против ~110% у чистых subscription-пиров (Culta со ссылкой на OpenView annual survey; 38% SaaS используют UBP, рост с 27% в 2021) — и на ~22% ниже отток vs flat-rate (Turnstile), потому что цена растёт вместе с успехом клиента (что и заложено в брифе). Жёсткие оговорки:

- **Bill shock — главный риск.** 78% IT-лидеров сталкивались с неожиданными счетами от consumption/AI-моделей (Zylo 2026 SaaS Management Index, опрос 218 IT-лидеров); там же 61% были вынуждены урезать проекты из-за неожиданного роста SaaS-затрат. Вариации месяц-к-месяцу могут превышать 50% (K-38 Consulting). Противоядие: real-time дашборды, алерты на 50/75/90% ожидаемого использования, опциональные hard caps (Culta, Stripe).
- **NRR-эрозия при миграции.** Low-usage клиенты платят больше и возражают; рекомендуется grandfathering 12–18 мес и shadow billing 60–90 дней с показом прогнозного счёта до выставления (Digital Applied).
- **Adoption.** К 2026 usage-based модели приняли 74% поставщиков ПО, 56% ждут роста usage-выручки к 2027 (Stripe).

### Straight-through processing / доля авто-одобрений (калибровка Low-тира)

- McKinsey: KYC-STP сокращает объём работы на 20–30% и повышает качество на 15–40%, но мало кто внедрил end-to-end STP.
- Гибридные модели: STP 60–80%; на практике manual review может стартовать с 45% и снижаться до 25% после года тюнинга (Zenoo, цитата Head of Compliance UK-челленджера).
- Для физлиц STP **35–55%** (Acquaintsoft, цит. PwC) — заметно консервативнее вендорских заявлений 70–85%.

### Free tiers и стартап-программы как канал входа

Реальные примеры: Didit — 500 бесплатных Full KYC/мес перманентно, заявленная цена $0.33/проверка; ComplyCube Startup Program (три трека по объёму финансирования, решение за 5–10 рабочих дней).

**Пробел:** независимых данных о конверсии и CAC-эффекте free tier нет — все материалы вендорские, эффективность канала документально не подтверждена.

## 5. Бенчмарки под OKR

| Метрика | Бенчмарк | Комментарий |
|---|---|---|
| False positive rate | AML TM: 90–95%; санкционный скрининг: до 99% | «Здоровый» таргет вендоров ~15% (Unit21), но реально это проблема ресурсов, а не только тюнинга. Rate >85% сигнализирует о неверной калибровке правил (Alessa). Отслеживать по типу флага/правила |
| Доля алертов → SAR | ~10% при 90% FP | SAR-conversion <3% сигнализирует о необходимости тюнинга правил (FluxForce) |
| Time-to-decision | 20–40 мин на алерт; SAR-филинг <30 дней | Дифференцировать по риск-тирам: Low — секунды на авто-одобрение, High — дни на EDD |
| Override rate | Публичного AML-бенчмарка не существует | Есть определение KPI (Galileo AI) и таргет «<10% необъяснённых override» (Censinet, healthcare). Клиническое исследование: override rate обратно пропорционален уверенности модели — 1.7% при confidence 90–99% против 99.3% при 70–79%. Отслеживать по типам флага как собственный OKR и калибровать пороги авто-одобрения по confidence-бэндам |
| Onboarding conversion / KYC drop-off | 20–68% в зависимости от источника | Signicat *The Battle to Onboard* (5-е изд., 7600 потребителей, 14 стран Европы): 68% бросали финансовые заявки за год (рост с 63% в 2020 — худший показатель с 2016). Большинство финтехов теряют 20–40% на KYC-флоу (CleverX); 40–60% при плохом дизайне; 70% бросают при длительности >3 минут. Повторная загрузка документа → в 3 раза выше шанс броска. Хорошая KYC-конверсия — 60–90% (Didit) |
| Потери бизнеса от онбординга | 70% фирм потеряли клиентов | Fenergo *Financial Crime Industry Trends 2025* (600 senior decision-makers, UK/US/Singapore): рост с 67% в 2024 и 48% в 2023. Средние затраты на AML/KYC — $72.9 млн/фирму/год. Каждое пятое приложение брошено из-за KYC/AML-сложностей → ~$3.3 млрд/год потерянного бизнеса |
| Explainability → скорость решения | Прямых количественных бенчмарков мало | Исследования показывают положительный эффект на доверие/приемлемость и снижение FP, но эффект контекстно-зависим и варьируется по экспертизе пользователя. Область для собственного A/B-замера |

### Что из этого меняет продуктовые решения (привязка к брифу)

- **Матрица риск-тиров (Low / Medium / High)** — подтверждена регуляторикой. Low-авто-одобрение обязано логироваться с легальным основанием (GDPR ст. 22, EDPB: «необходимость, а не удобство»); High-вето compliance согласуется с обязательным human oversight (EU AI Act ст. 14). Порог авто-одобрения Low калибровать по confidence-бэндам модели и держать долю авто-одобрений в реалистичном диапазоне STP 35–55% для физлиц, а не в маркетинговых 70–85%.
- **4-eyes и запрет override в одно действие** — прямо валидированы SCHUFA. Senior Compliance Officer должен иметь реальную власть отменить AI-вердикт, и это действие обязано логироваться (кто / когда / почему).
- **Explainability в карточке** (версия модели + входные данные) — совпадает с требованиями EU AI Act (traceability, ст. 11/13) и с эмпирикой о доверии; снижает override-издержки, alert fatigue и ускоряет разбор. Это не «фича», а regulatory must-have к августу 2026.
- **Показ расхождения источников** (Sumsub / ComplyAdvantage / внутренний поведенческий скоринг) вместо усреднения — отвечает на системную боль «data inaccuracy» и неполные источники adverse media из отзывов G2; помогает быстрее разбирать false positives и защищает от слепого доверия единому скору.
- **Аудит-лог** (кто / когда / что + timestamp + user ID + версия модели + входные данные, включая авто-одобрения Low) — соответствует ст. 77 AMLR (5 лет), BSA (5 лет, OFAC до 10 лет), EU AI Act (логирование). Хранение — tamper-evident (хеш / подписи), с политикой удаления по истечении срока: AMLR запрещает бессрочное хранение.
- **Модель seats + usage overage** — экономически оправдана (NRR ~120%, отток ниже на ~22%), но обязательна защита от bill shock: real-time метринг, алерты 50/75/90%, опциональные caps, «предсказуемость счёта» как отдельный OKR. Учесть структурную эрозию цены за верификацию (−15% к 2029) — не строить overage-маржу только на per-check спреде; при масштабировании клиента предусмотреть grandfathering и shadow billing.
- **pKYC** — дополнить периодический re-review событийным непрерывным мониторингом (санкции / PEP / adverse media / поведение), иначе продукт отстанет от главного рыночного тренда и от ожиданий AMLR по ongoing monitoring.

## Каветы

- **Размеры рынка сильно расходятся** между аналитическими домами из-за разных определений — приведены диапазоны, не единые числа. Синдицированные оценки KYB особенно ненадёжны (база 2024: от $0.37 млрд E-KYB до $4.8 млрд).
- Многие цифры по эффективности AI (снижение FP на 70–80%) — вендорские маркетинговые заявления в контролируемых условиях; помечены отдельно.
- 90–95% FP rate восходит к оценке PwC ~2017–2018 и воспроизводится годами — это устойчивый порядок величины, а не свежее точное измерение.
- Данные по выгоранию — преимущественно из SOC/fraud, не строго AML; экстраполировать осторожно.
- Override rate и эффективность free tier — реальные пробелы в публичных данных; отслеживать внутренними метриками.
- Поправки к срокам EU AI Act (голосование Европарламента 18 июня 2026) — область изменений; финальные даты уточнять по официальным публикациям.
- Прогнозные величины (рост IDV-трат на 74% до $26 млрд, market forecasts до 2030–2034) — это проекции аналитиков, а не свершившиеся факты.

## Источники

### Рынок и размеры

- MarketsandMarkets — Identity Verification: https://www.marketsandmarkets.com/Market-Reports/identity-verification-market-178660742.html
- MarketsandMarkets — KYC/AML: https://www.marketsandmarkets.com/Market-Reports/kyc-aml-market-47653988.html
- Mordor Intelligence — KYC Market: https://www.mordorintelligence.com/industry-reports/kyc-market
- Mordor Intelligence — RegTech: https://www.mordorintelligence.com/industry-reports/global-regtech-industry
- Verified Market Reports — KYC and ID Verification: https://www.verifiedmarketreports.com/product/kyc-and-id-verification-market/
- Fortune Business Insights — RegTech: https://www.fortunebusinessinsights.com/regtech-market-108305
- The Business Research Company — RegTech: https://www.thebusinessresearchcompany.com/report/regtech-global-market-report
- Polaris Market Research — RegTech: https://www.polarismarketresearch.com/industry-analysis/regtech-market
- Growth Market Reports — KYB: https://growthmarketreports.com/report/know-your-business-verification-market
- Dataintelo — KYB: https://dataintelo.com/report/know-your-business-market
- Global Industry Analysts — E-KYB: https://www.marketresearch.com/Global-Industry-Analysts-v1039/Electronic-Know-Your-Business-KYB-41651297/

### Затраты на compliance и цена за верификацию

- LexisNexis True Cost of Financial Crime Compliance 2023 (global): https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20230926-global-financial-crime-compliance-costs
- LexisNexis (EMEA): https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20240306-true-cost-of-compliance-emea
- LexisNexis (APAC): https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20240306-true-cost-of-compliance
- LexisNexis (US/Canada): https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20240221-true-cost-of-compliance-us-ca
- Juniper Research / Biometric Update — эрозия цены IDV: https://www.biometricupdate.com/202412/identity-verification-scale-and-maturity-to-push-average-cost-down
- Fintechspecs — KYC cost per verification: https://fintechspecs.com/blog/kyc-cost-per-verification-pricing-benchmarks/

### Регуляторика

- EU AI Act и AML (Unit21): https://www.unit21.ai/blog/eu-ai-act-2026-faqs-what-fraud-and-aml-teams-need-to-know
- EU AI Act для AML (sanctions.io): https://www.sanctions.io/blog/what-the-eu-ai-act-means-for-aml-compliance
- EU AI Act и кредитный скоринг (Openlayer): https://www.openlayer.com/blog/credit-scoring-eu-ai-act-compliance-guide
- AMLR — что меняется в июле 2027: https://www.checkmarble.com/blog/eu-amlr
- EU AML package / AMLA guide: https://financialregulations.eu/blog/eu-aml-package-amla-amlr-guide
- Ст. 77 AMLR — сроки хранения: https://anti-money-laundering.eu/new-record-retention-periods-under-art-77-amlr/
- FFIEC BSA/AML — record retention: https://bsaaml.ffiec.gov/manual/Appendices/17
- Аудит-трейлы в AML: https://blog.voveid.com/audit-trails-aml-compliance-review/
- DORA (ESMA): https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora
- DORA (DLA Piper): https://www.dlapiper.com/en-us/insights/publications/2025/02/application-of-the-digital-operational-resilience-act—dora
- GDPR ст. 22 / SCHUFA C-634/21 (IAPP): https://iapp.org/news/a/key-takeaways-from-the-cjeus-recent-automated-decision-making-rulings
- GDPR ст. 22 guide: https://secureprivacy.ai/blog/gdpr-article-22-automated-decision-making-guide
- CJEU ruling (Cloisters): https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision
- AI-регулирование APAC: https://www.pertamapartners.com/insights/ai-regulations-asia-pacific-guide
- DPIA Malaysia / ADMP: https://malaysia.incorp.asia/blogs/dpia-malaysia-automated-decision-making/
- Singapore PDPA и ADM: https://aigovernance.com/policy/singapore-pdpa-ai-amendments-automated-decision-making
- Perpetual KYC (SymphonyAI): https://www.symphonyai.com/resources/blog/financial-services/perpetual-kyc-always-on-compliance/
- Perpetual KYC (Fenergo): https://resources.fenergo.com/blogs/perpetual-kyc-pkyc
- Perpetual KYC (Capgemini): https://www.capgemini.com/insights/research-library/reimagining-kyc-pkyc-framework/

### Боль пользователей, false positives, бенчмарки

- False positives (DataVisor / PwC): https://www.datavisor.com/blog/guest-post-end-the-false-positive-alerts-plague-in-anti-money-laundering-aml-systems
- AML false positive report (Facctum): https://www.facctum.com/blog/aml-false-positive-report
- FP rates in transaction monitoring (FluxForce): https://www.fluxforce.ai/statistics/false-positive-rates-transaction-monitoring
- Санкционный скрининг — 99% FP (EPI): https://www.electronicpaymentsinternational.com/comment/why-99-percent-sanctions-screening-alerts-false-positives/
- Sanctions screening accuracy benchmark: https://www.fluxforce.ai/statistics/sanctions-screening-accuracy-benchmark
- AML staffing / cost per alert: https://www.fluxforce.ai/statistics/aml-staffing-cost-per-bank
- AML cost calculator: https://calcbee.com/calculators/legal/compliance/aml-cost-calculator/
- Alert fatigue: https://www.vectra.ai/topics/alert-fatigue
- Скрытые издержки AML-compliance (Flagright): https://www.flagright.com/post/overcoming-the-hidden-costs-of-aml-compliance
- Explainable AI in finance (CFA Institute): https://rpc.cfainstitute.org/research/reports/2025/explainable-ai-in-finance
- GenAI в compliance: explainability и аудит (FinTech Global): https://fintech.global/2026/02/11/genai-in-compliance-explainability-auditability-and-trust/
- Отзывы ComplyAdvantage (G2): https://www.g2.com/products/complyadvantage/reviews
- Отзывы Sumsub (G2): https://www.g2.com/products/sumsub/reviews
- Sumsub — buyer overview: https://www.rfp.wiki/it-security/identity-verification/sumsub

### Ценовые модели, STP, онбординг

- Usage-based pricing (Culta): https://culta.ai/blog/usage-based-pricing-saas
- Usage-based pricing (Stripe): https://stripe.com/fr/resources/more/usage-based-pricing-strategy-for-saas
- Decision matrix 2026 (Digital Applied): https://www.digitalapplied.com/blog/saas-usage-based-pricing-models-decision-matrix-2026
- Usage-based vs subscription (K-38): https://k38consulting.com/usage-based-pricing-vs-subscription-models/
- KYC + straight-through processing (McKinsey): https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/solving-the-kyc-puzzle-with-straight-through-processing
- KYC automation benchmarks (Zenoo): https://www.zenoo.com/blog/kyc-automation-benchmarks-2024/
- Digital onboarding в финтехе (Signicat): https://qubstudio.com/blog/digital-onboarding-fintech/
- AI onboarding (Fenergo data): https://www.lorikeetcx.ai/articles/ai-onboarding-fintech
- KYC conversion rate: https://shuftipro.com/blog/kyc-conversion-rate/
- Fintech onboarding research: https://cleverx.com/blog/fintech-onboarding-research-kyc-flow-optimization/
- Didit pricing / free tier: https://didit.me/pricing/
- ComplyCube Startup Program: https://www.complycube.com/en/company/startup-program/
- Human-in-the-loop oversight KPI (Galileo AI): https://galileo.ai/blog/human-in-the-loop-agent-oversight
