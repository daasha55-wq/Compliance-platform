# Sitemap

```
Root
  Login [core] — вход, определение роли (Compliance Officer / Senior CO / CPO)
  Onboarding [core] — первый вход в аккаунт: начальная настройка, приглашение команды
  Cases — раздел разбора кейсов
    CaseQueue [core] — очередь кейсов, обзор и приоритизация
      EmptyCaseQueue [core] — очередь пуста, кейсов для разбора нет
      LoadingState [core] — загрузка очереди
    CaseDetail [core] — карточка кейса: сводка → детали → решение
      CaseHistory [core] — вкладка аудит-лога внутри карточки кейса
      ErrorState [core] — внешний источник (Sumsub/ComplyAdvantage) недоступен
  Confirmations — раздел эскалаций для Senior Compliance Officer
    ConfirmationQueue [core] — кейсы в статусе «Ожидает подтверждения»
  Insights — раздел метрик для CPO
    CPODashboard [v2] — override rate, onboarding conversion, прогноз счёта
  RiskRules — раздел настройки риск-логики
    RiskRuleBuilder [v2] — no-code конструктор матрицы риск-тиров
  Migration — раздел переноса данных при смене вендора
    CaseImportWizard [later] — read-only импорт исторических кейсов
  Account — раздел настроек аккаунта
    AccountSettings [core] — профиль, уведомления
    TeamManagement [core] — назначение ролей пользователям
  Marketing — раздел до входа в продукт
    DemoDashboard [later] — демо с примерными цифрами до контакта с sales
    SignupPricing [later] — self-serve регистрация / страница цены
  NotFound [core] — 404, переход по несуществующей или удалённой ссылке
```

## Комментарий по структуре

- **Cases** и **Confirmations** разделены, хотя оба работают с одним и тем же объектом «кейс» — потому что это разные роли с разными правами (Compliance Officer решает, Senior CO подтверждает эскалацию), и в PRD это два разных экрана входа (CaseQueue vs ConfirmationQueue).
- **Marketing** (DemoDashboard, SignupPricing) — раздел целиком под вопросом: в PRD обе фичи помечены «Won't have (now)» из-за нерешённого GTM-вопроса (self-serve vs sales-led). Оставлен в дереве, т.к. экраны упомянуты в документе, но при движении в разработку раздел может быть удалён целиком, если решение будет в пользу чистого sales-led без самостоятельной регистрации.
- Глубина нигде не превышает 3 уровня (раздел → экран → состояние/вкладка).
