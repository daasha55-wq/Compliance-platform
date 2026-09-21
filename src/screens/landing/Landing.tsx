import { Rows3 } from 'lucide-react'
import { Button, Badge, RiskIndicator, AccordionRow, CaseQueueHeader, CaseQueueRow } from '../../components'
import styles from './Landing.module.css'

const problemStats: [string, string][] = [
  ['90–95%', 'AML-алертов — false positives. Ваша команда физически не может относиться к каждому кейсу одинаково'],
  ['20–68%', 'пользователей бросают KYC-онбординг. Compliance — не абстрактный тормоз, а измеримая потеря выручки'],
  ['0 из 5', 'крупных конкурентов формализуют реальный override AI-решения. Несогласие с AI сейчас решается в Slack-переписке — а не в аудит-следе'],
  ['78%', 'IT-лидеров сталкивались с bill shock от usage-моделей. Мы считаем предсказуемость счёта отдельной метрикой успеха, не постфактум'],
]

const regulatory: [string, string][] = [
  ['EU AI Act', 'High-risk обязательства для AML-риск-профилирования в силе с 2 августа 2026. Требует human oversight, логирование, traceability.'],
  ['Дело SCHUFA (CJEU C-634/21)', 'Человеческий sign-off без реальной власти отменить AI-решение не считается human oversight. «Резиновый штамп» юридически не защищает.'],
  ['AMLR', 'Единый рулбук ЕС с 10 июля 2027, ст. 77 требует 5-летний tamper-evident аудит-след.'],
]

const differentiators: [string, string, string][] = [
  ['Риск-матрица Low/Medium/High как явный UI-паттерн', 'Ни один из 5 конкурентов (Sumsub, Alloy, ComplyAdvantage, Persona, Unit21) не показывает риск-тир как явный интерфейсный паттерн', 'EU AI Act ст. 14 и GDPR ст. 22'],
  ['Расхождение источников показано явно, не усредняется', 'Прямой ответ на «Data Inaccuracy» — 7 упоминаний в отзывах ComplyAdvantage на G2', 'Снимает необходимость вручную сверять два отчёта вендоров'],
  ['4-eyes как формализованная роль и статус кейса', 'Ни у одного конкурента (частично — только у Unit21)', 'Юридически обосновано делом SCHUFA: override должен быть реальным, не формальностью'],
  ['Explainability-блок прямо в карточке кейса', 'У конкурентов — «под капотом» или спрятано за доп. кликами', 'EU AI Act ст. 11/13, traceability для деплойеров'],
]

const howItWorks: [string, string][] = [
  ['Low risk', 'Авто-одобрение с обязательной фиксацией в аудит-логе. Офицер не тратит на это время.'],
  ['Medium risk', 'Soft-block с SLA. Кейс ждёт ревью, не блокирует остальную очередь.'],
  ['High risk', 'Жёсткое вето. Не проходит без явного решения compliance — эскалация в очередь Senior Compliance Officer с полным контекстом.'],
]

const mockQueueRows = [
  { tier: 'low', tierLabel: 'Low', applicant: 'Иван Петров', statusLabel: 'Одобрено (авто)', statusVariant: 'success', sla: '—', date: '24.08.2026', discrepancy: '—' },
  { tier: 'medium', tierLabel: 'Medium', applicant: 'Ольга Смирнова', statusLabel: 'На проверке', statusVariant: 'warning', sla: '4ч', date: '24.08.2026', discrepancy: '—' },
  { tier: 'high', tierLabel: 'High', applicant: 'Дмитрий Волков', statusLabel: 'Ожидает решения', statusVariant: 'info', sla: '—', date: '24.08.2026', discrepancy: '⚠ Расхождение есть' },
] as const

const roles: [string, string, boolean][] = [
  ['Compliance Officer', 'Ежедневная очередь, прогрессивное раскрытие, решение по Low/Medium за секунды на одном экране', false],
  ['Senior Compliance Officer', 'Очередь «Ожидает подтверждения», полный контекст без пересбора кейса с нуля', false],
  ['CPO', 'Override rate и onboarding conversion рядом на одном экране, не в разных инструментах', true],
]

const trustStatuses: [string, string, 'success' | 'warning'][] = [
  ['Аудит-лог', 'Интеграция', 'success'],
  ['SOC2 / ISO 27001', 'В процессе', 'warning'],
  ['DORA', 'В процессе', 'warning'],
]

const auditLogPreview = [
  '24.08.2026, 09:14 — Кейс создан системой, входные данные получены от Sumsub/ComplyAdvantage',
  '24.08.2026, 09:15 — Риск-тир присвоен: High, правило risk-model v2.3',
  '24.08.2026, 14:31 — Ожидает решения Senior Compliance Officer',
]

const faq: string[] = [
  'У нас уже есть Sumsub/ComplyAdvantage — это конфликт?',
  'Мы ещё не подпадаем под EU AI Act — нам это рано?',
  'Сколько занимает внедрение?',
  'Что если офицер не согласен с AI-вердиктом?',
  'Почему не self-serve триал, как у Sumsub/Persona?',
]

export default function Landing() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <Rows3 size={24} strokeWidth={2} className={styles.brandIcon} />
          <span className="ds-heading-xl">Compliance Platform</span>
        </div>
        <nav className={styles.nav}>
          <a href="#product" className="ds-body-sm">Продукт</a>
          <a href="#how-it-works" className="ds-body-sm">Как это работает</a>
          <a href="#trust" className="ds-body-sm">Безопасность</a>
          <a href="#footer" className="ds-body-sm">О компании</a>
        </nav>
        <Button type="primary" size="md">Запросить демо</Button>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={`${styles.heroTitle} ds-heading-4xl`}>
            AI-риск-скоринг для KYC/AML, который выдержит проверку регулятора
          </h1>
          <p className={`${styles.heroSubhead} ds-body-base`}>
            Compliance-платформа для растущих финтех-стартапов: KYC, AML, санкционный/PEP-скрининг и explainability
            каждого AI-вердикта — в одной подписке, поверх ваших текущих вендоров.
          </p>
          <div className={styles.heroCtas}>
            <Button type="primary" size="lg">Запросить демо</Button>
            <Button type="ghost" size="lg">Как это работает</Button>
          </div>
          <span className={`${styles.heroTrust} ds-body-xs`}>
            Работает поверх Sumsub и ComplyAdvantage — не требует их замены
          </span>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.heroCardTop}>
            <RiskIndicator tier="high">High risk</RiskIndicator>
            <Badge variant="info" size="md">Ожидает решения</Badge>
          </div>
          <div className={styles.heroCardRows}>
            <AccordionRow label="AML / Sanctions / PEP screening" />
            <AccordionRow label="Документы" />
          </div>
          <div className={styles.heroCardActions}>
            <Button type="primary" size="sm" disabled>Подтвердить решение</Button>
            <Button type="secondary" size="sm">Эскалировать</Button>
            <Button type="secondary" size="sm">Отклонить</Button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="product" className={styles.problem}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Знакомая картина</h2>
        <div className={styles.statGrid}>
          {problemStats.map(([stat, text]) => (
            <div key={stat} className={styles.statCard}>
              <span className={`${styles.statNumber} ds-heading-3xl`}>{stat}</span>
              <span className="ds-body-sm">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regulatory */}
      <section className={styles.regulatory}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Это уже не просто хорошая практика</h2>
        <div className={styles.regulatoryGrid}>
          {regulatory.map(([law, text]) => (
            <div key={law} className={styles.regulatoryCard}>
              <Badge variant="info" size="md">{law}</Badge>
              <span className="ds-body-sm">{text}</span>
            </div>
          ))}
        </div>
        <div className={styles.regulatoryClosing}>
          <span className="ds-body-sm-medium">
            Наши риск-тиры, 4-eyes и explainability — не UX-решение. Это ответ на конкретные статьи закона.
          </span>
        </div>
      </section>

      {/* Differentiators */}
      <section className={styles.differentiators}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Наш продукт vs рынок</h2>
        <div className={styles.diffGrid}>
          {differentiators.map(([title, gap, law]) => (
            <div key={title} className={styles.diffCard}>
              <span className="ds-body-sm-medium">{title}</span>
              <div className={styles.diffRow}>
                <Badge variant="error" size="sm">Нет у рынка</Badge>
                <span className={`${styles.diffGapText} ds-body-sm`}>{gap}</span>
              </div>
              <span className={`${styles.diffLawText} ds-body-xs`}>{law}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={styles.howItWorks}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Разбор кейса за 3 шага</h2>
        <div className={styles.stepGrid}>
          {howItWorks.map(([tier, text], i) => (
            <div key={tier} className={styles.stepCard}>
              <RiskIndicator tier={i === 0 ? 'low' : i === 1 ? 'medium' : 'high'}>{tier}</RiskIndicator>
              <span className="ds-body-sm">{text}</span>
            </div>
          ))}
        </div>
        <div className={styles.mockTable}>
          <CaseQueueHeader />
          {mockQueueRows.map((row) => (
            <CaseQueueRow key={row.applicant} {...row} />
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className={styles.roles}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Для всей compliance-цепочки</h2>
        <div className={styles.roleGrid}>
          {roles.map(([role, text, roadmap]) => (
            <div key={role} className={styles.roleCard}>
              <Badge variant="info" size="md">{role}</Badge>
              <span className="ds-body-sm">{text}</span>
              {roadmap && <span className={`${styles.roadmapNote} ds-body-xs`}>Роадмап v1.1</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className={styles.trust}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Доверие и безопасность</h2>
        <div className={styles.trustGrid}>
          <div className={styles.trustAuditCard}>
            <span className="ds-body-sm-medium">Аудит-лог</span>
            <span className="ds-body-sm">
              Кто/когда/что, включая авто-одобрения. Версия модели и входные данные при каждом вердикте.
              5-летнее tamper-evident хранение (AMLR ст. 77).
            </span>
            <div className={styles.auditPreview}>
              {auditLogPreview.map((entry) => (
                <span key={entry} className={`${styles.auditLine} ds-body-xs`}>{entry}</span>
              ))}
            </div>
          </div>
          <div className={styles.trustStatusColumn}>
            {trustStatuses.map(([label, status, variant]) => (
              <div key={label} className={styles.trustStatusCard}>
                <span className="ds-body-sm-medium">{label}</span>
                <Badge variant={variant} size="sm">{status}</Badge>
              </div>
            ))}
          </div>
        </div>
        <span className={`${styles.trustFootnote} ds-body-xs`}>
          Работает поверх ваших вендоров — интегрируется с ведущими KYC/AML-провайдерами, не требует их замены.
        </span>
      </section>

      {/* Pricing */}
      <section className={styles.pricing}>
        <div className={styles.pricingLeft}>
          <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Как устроена цена</h2>
          <p className="ds-body-sm">
            Модель: подписка (seats) + usage overage — растёт вместе с вашим бизнесом, не фиксированный
            enterprise-скачок.
          </p>
          <Button type="primary" size="md">Обсудить цену для вашей команды</Button>
        </div>
        <div className={styles.pricingCards}>
          <div className={styles.pricingCard}>
            <span className="ds-body-sm-medium">Модель</span>
            <span className="ds-body-sm">Seats + usage overage, растёт вместе с бизнесом</span>
          </div>
          <div className={styles.pricingCard}>
            <span className="ds-body-sm-medium">Защита от bill shock</span>
            <span className="ds-body-sm">Real-time метринг использования, алерты приближения к порогу</span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2 className={`${styles.sectionTitle} ds-heading-2xl`}>Частые вопросы</h2>
        <div className={styles.faqList}>
          {faq.map((q) => (
            <AccordionRow key={q} label={q} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <span className={`${styles.finalCtaText} ds-heading-2xl`}>
          Готовы показать, как это работает на вашем потоке кейсов?
        </span>
        <Button type="secondary" size="lg">Запросить демо</Button>
      </section>

      {/* Footer */}
      <footer id="footer" className={styles.footer}>
        <div className={styles.footerCol}>
          <span className="ds-body-sm-medium">Продукт</span>
          <a href="#product" className="ds-body-sm">Как это работает</a>
          <a href="#trust" className="ds-body-sm">Безопасность</a>
        </div>
        <div className={styles.footerCol}>
          <span className="ds-body-sm-medium">Компания</span>
          <a href="#" className="ds-body-sm">О нас</a>
        </div>
        <div className={styles.footerCol}>
          <span className="ds-body-sm-medium">Юридическое</span>
          <a href="#" className="ds-body-sm">Privacy</a>
          <a href="#" className="ds-body-sm">DPA</a>
        </div>
        <div className={styles.footerCol}>
          <span className="ds-body-sm-medium">Контакты</span>
          <a href="#" className="ds-body-sm">Запросить демо</a>
        </div>
        <span className={`${styles.footerNote} ds-body-xs`}>
          Юрисдикции и сертификаты — по мере фактического получения.
        </span>
      </footer>
    </div>
  )
}
