# Foundation

**Бриф:** RegTech / Compliance SaaS, b2b, строгий/надёжный, web, ru

## Слой 1 — примитивные токены

### Палитра
- accent-500 = #2563EB — основной акцент (насыщенный синий, доверие/строгость, без ассоциации с конкретным банковским брендом)
- accent-100 = #DBEAFE, accent-300 = #93C5FD, accent-700 = #1D4ED8, accent-900 = #1E3A8A — оттенки акцента
- gray-00 = #FFFFFF
- gray-50 = #F8FAFC
- gray-100 = #F1F5F9
- gray-200 = #E2E8F0
- gray-300 = #CBD5E1
- gray-500 = #64748B
- gray-700 = #334155
- gray-900 = #0F172A
- gray-950 = #020617
- success-500 = #16A34A, warning-500 = #D97706, error-500 = #DC2626, info-500 = #0891B2 — функциональные

### Типографика
- font-sans = Inter (поддержка кириллицы Ш/Щ/Ь/Ы — соответствует локали ru)
- size-xs = 12, size-sm = 14, size-base = 16, size-lg = 18, size-xl = 20, size-2xl = 24, size-3xl = 32, size-4xl = 48
- weight-regular = 400, weight-medium = 500, weight-semibold = 600, weight-bold = 700
- line-height-base = 1.5 — +5% от 1.43 под кириллицу

### Радиусы
- radius-none = 0, radius-sm = 4, radius-md = 8, radius-lg = 16

Строгий/надёжный тон → в компонентах по умолчанию используется radius-sm/radius-md, radius-lg — только для крупных поверхностей (модалки, карточки), без «мягкого» radius-lg на кнопках/инпутах.

### Отступы
- space-1 = 4, space-2 = 8, space-3 = 12, space-4 = 16, space-6 = 24, space-8 = 32, space-12 = 48, space-16 = 64

### Тени
- shadow-sm, shadow-md, shadow-lg — 3 уровня, мягкие, нейтрально-серые (без брендового цвета)

## Слой 2 — смысловые токены

### Поверхности
- surface-default → gray-00
- surface-subtle → gray-50
- surface-action-primary → accent-500
- surface-action-primary-hover → accent-700
- surface-action-secondary-hover → gray-100 — расширено в component_variants (Button/IconButton hover)
- surface-selected → accent-100 — расширено в component_variants (Card selected)

### Текст
- text-default → gray-900
- text-muted → gray-500
- text-on-action → gray-00
- text-error → error-500

### Обводки
- border-default → gray-200
- border-strong → gray-300
- border-error → error-500
- border-focus-ring → accent-500 — расширено в component_variants (Input focus)

### Состояния
- bg-success → success-500
- bg-warning → warning-500
- bg-error → error-500
- bg-info → info-500
- icon-success → success-500 — добавлено вручную на экране (screens/confirmation-queue, иконка check в логотип-слоте), перепривязано с прямого Primitive на Semantic alias

## Слой 3 — компонентные токены
*На стартовом наборе не нужен. Добавляется отдельной директивой при расширении компонентов вариантами и состояниями (button-padding-y, input-height и т.д.).*
