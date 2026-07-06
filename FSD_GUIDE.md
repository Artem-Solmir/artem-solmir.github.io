# FSD (Feature-Sliced Design) Architecture

Проект структурирован согласно методологии **Feature-Sliced Design**. Это архитектурный подход, который организует код в независимые слои (layers) и срезы (slices).

## Структура проекта

```
src/
├── app/                  # Application layer (инициализация приложения)
│   ├── layout/          # Root layout компоненты
│   └── App.tsx
├── pages/               # Page layer (страницы приложения)
├── widgets/             # Widget layer (сложные составные компоненты)
├── features/            # Feature layer (пользовательские функции)
├── entities/            # Entity layer (бизнес-сущности)
└── shared/              # Shared layer (переиспользуемые части)
    ├── ui/              # Shared UI компоненты
    ├── utils/           # Утилиты
    ├── hooks/           # Custom React hooks
    ├── constants/       # Константы
    └── types/           # Общие TypeScript типы
```

## Слои архитектуры

### 🎯 **app** (Application)
- Инициализация приложения, глобальная конфигурация
- Провайдеры, layouts
- **Не может зависеть** от других слоёв (кроме shared)

### 📄 **pages** (Pages)
- Отдельные страницы приложения
- Может содержать routing логику
- Собирает widgets и features на странице

### 🧩 **widgets** (Widgets)
- Независимые, переиспользуемые UI компоненты
- Сложнее, чем shared/ui компоненты
- Могут содержать multiple entities и features

### ⚡ **features** (Features)
- Пользовательские функции (например: авторизация, фильтрация)
- Группируются по бизнес-функциям
- Не зависят от других features

### 🏛️ **entities** (Entities)
- Бизнес-сущности (например: User, Product, Post)
- Модели данных, компоненты сущностей
- Не зависят от features

### 🎁 **shared** (Shared)
- Переиспользуемый код
- UI компоненты, утилиты, хуки
- Может использоваться всеми слоями

## Правила зависимостей (Dependency Graph)

```
app/
  ↓
pages/
  ↓ (может использовать)
widgets/, features/
  ↓ (может использовать)
entities/
  ↓ (может использовать)
shared/
```

### ✅ Правильно:
```typescript
// В features/auth
import { UserEntity } from '@entities/user';
import { Button } from '@shared/ui';
```

### ❌ Неправильно:
```typescript
// В entities/user (не может зависеть от features)
import { AuthForm } from '@features/auth';

// В shared (не может зависеть от выше расположенных слоёв)
import { Button } from '@widgets/header';
```

## Path Aliases

⚠️ **Важно для Create React App**: 
CRA нативно не поддерживает path aliases из tsconfig.json в webpack. Есть несколько способов:

### Вариант 1: Использовать относительные импорты (текущий способ ✅)
```typescript
import { Button } from '../../shared/ui';
import { useAuth } from '../../features/auth';
```

### Вариант 2: Установить CRACO для aliases
Если хочешь использовать красивые импорты без eject:

```bash
npm install @craco/craco --save-dev
npm install craco-alias --save-dev
```

Создать `craco.config.js`:
```javascript
const CracoAliasPlugin = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "tsconfig",
        baseUrl: "./src"
      }
    }
  ]
};
```

Обновить `package.json`:
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

Тогда можно использовать:
```typescript
import { Button } from '@shared/ui';
import { useAuth } from '@features/auth';
```

### Вариант 3: Eject из CRA (не рекомендуется)
```bash
npm run eject
```

После этого можно настроить webpack напрямую.

## Примеры использования

### Структура feature:
```
features/
  auth/
    ui/
      LoginForm.tsx
      RegisterForm.tsx
    model/
      authSlice.ts
      useAuth.ts
    api/
      authApi.ts
    types.ts
    index.ts
```

### Структура entity:
```
entities/
  user/
    ui/
      UserCard.tsx
    model/
      types.ts
      constants.ts
    api/
      userApi.ts
    index.ts
```

## Best Practices

1. **Чистые границы слоёв** - не нарушай граф зависимостей
2. **Public API** - каждый layer имеет `index.ts` для экспорта публичного API
3. **Одна ответственность** - feature отвечает за одну функцию
4. **Группировка по типам** (ui, model, api) - облегчает навигацию
5. **Переиспользование** - максимизируй код в shared слое

## Ссылки

- [Feature-Sliced Design официальный сайт](https://feature-sliced.design/)
- [Feature-Sliced Design на GitHub](https://github.com/feature-sliced/documentation)
