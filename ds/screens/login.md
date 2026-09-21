# Screen: Login

**Wireframe source:** `ia/wireframes/Login.md`
**Final Screen Node ID:** `160:381`

## Composition

### Root (FIXED 1440×1024, `surface-default`)
- Auto Layout VERTICAL, содержимое отцентровано по обеим осям (`primaryAxisAlignItems=CENTER`, `counterAxisAlignItems=CENTER`)

### LoginCard (HUG×AUTO, ширина зафиксирована 400)
- «Compliance Platform» (`DS/Heading/lg`, `text-default`)
- «Вход» (`DS/Heading/lg`, `text-default`)
- Input instance (`18:287`, `State=Default`) — email, override текста → «a.smirnova@compliancecorp.ru»
- Input instance (`18:287`, `State=Default`) — пароль, override текста → «••••••••»
- Button instance (`18:280`, `Type=Primary, State=Default`) — «Войти»
- «Забыли пароль?» (`DS/Body/sm`, `text-muted`)

## Edge cases

### Ошибка входа (`visible: false`)
- Input instance (`State=Error`) вместо email-поля (override текста сохранён)
- Текст «Неверный email или пароль» под полем (`DS/Body/sm`, `text-error`)

### Загрузка (`visible: false`)
- Button instance (`Type=Primary, State=Disabled`) вместо активной кнопки, текст «Вход...» — отдельного Loading-состояния у Button нет, ближайшее соответствие State=Disabled

## Tokens used
- Цвета: `surface-default`, `text-default`, `text-muted`, `text-error`
- Отступы: `space-6` (`itemSpacing` карточки)
- Typography: `DS/Heading/lg`, `DS/Body/sm`

## Известные ограничения
- Role-picker на экране нет: PRD описывает определение роли как результат аутентификации, не отдельный UI-элемент (см. `ia/wireframes/Login.md`)
- Это первое реальное использование компонента Input в проекте — до этого экрана Input нигде не встречался (см. `ds/components.md`, Раздел 4 предыдущего аудита `screens_audit`)
