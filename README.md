# Compliance-платформа для финтех-стартапов

UX/UI-проект compliance-платформы: React-база с UI-китом и каталогом компонентов (Storybook), плюс сопутствующая исследовательская и продуктовая документация (brief, PRD, персоны, конкурентный анализ, IA/wireframes).

## Из чего состоит

- `src/` — React-приложение и UI-кит (компоненты, токены дизайн-системы, foundation)
- `.storybook/` — конфигурация Storybook-каталога компонентов
- `ds/` — дизайн-система: контракт, токены, спецификации экранов (`ds/CONTRACT.md`, `ds/foundation.md`, `ds/components.md`)
- `ia/` — информационная архитектура: sitemap, wireframes, пользовательские потоки
- `directives/`, `directive_*.md` — SOP-директивы для агентного workflow проекта
- Продуктовая документация в корне: `brief.md`, `prd.md`, `personas.md`, `mvp_scope.md`, `competitive_analysis*.md` и др.

## Как запустить

```bash
npm install
npm run dev          # React-приложение (Vite)
npm run storybook    # каталог компонентов (Storybook, порт 6006)
npm run build         # production-сборка
```

## Стек

React 19, Vite, TypeScript, Storybook 10, CSS Modules.
