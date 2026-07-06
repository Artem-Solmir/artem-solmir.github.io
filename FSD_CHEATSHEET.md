# FSD Quick Reference

## 📁 Где создавать новый код?

### Я делаю новый UI компонент (кнопка, инпут, карточка)
→ `src/shared/ui/ComponentName/`

### Я делаю сложный компонент со своей логикой (заголовок с меню, форма входа)
→ `src/widgets/WidgetName/` или `src/features/FeatureName/ui/`

### Я делаю бизнес-сущность (User, Product, Post)
→ `src/entities/EntityName/`

### Я добавляю функцию (авторизация, фильтрацию, уведомления)
→ `src/features/FeatureName/`

### Я добавляю новую страницу
→ `src/pages/PageName/`

### Я добавляю хук, утилиту, констату
→ `src/shared/hooks/`, `src/shared/utils/`, `src/shared/constants/`

---

## 📝 Типичная структура feature

```typescript
// features/auth/index.ts - ПУБЛИЧНЫЙ API
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';
export type { AuthContext } from './types';

// features/auth/ui/LoginForm.tsx
import React from 'react';
import { Button } from '@shared/ui';
import { useAuth } from '../model/useAuth';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  // ...
};

// features/auth/model/useAuth.ts
import { useState } from 'react';
import { loginApi } from '../api/authApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  
  const login = async (email: string, password: string) => {
    const response = await loginApi(email, password);
    setUser(response.data);
  };

  return { user, login };
};

// features/auth/api/authApi.ts
export const loginApi = async (email: string, password: string) => {
  // API call
};

// features/auth/types.ts
export interface AuthContext {
  user: User | null;
  isLoading: boolean;
}
```

---

## 📝 Типичная структура entity

```typescript
// entities/user/index.ts - ПУБЛИЧНЫЙ API
export { UserCard } from './ui/UserCard';
export type { User } from './types';
export { USER_ROLES } from './constants';

// entities/user/ui/UserCard.tsx
import React from 'react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

// entities/user/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'user' | 'guest';

// entities/user/constants.ts
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;
```

---

## ✅ Правила импортов

```typescript
// ✅ ПРАВИЛЬНО - относительные импорты (для CRA)
import { Button } from '../../shared/ui';
import { useAuth } from '../../features/auth';
import { User } from '../../entities/user';

// ℹ️ Для красивых импортов - используй CRACO
// Смотри FSD_GUIDE.md для инструкций

// ❌ НЕПРАВИЛЬНО (в стандартном CRA)
import { Button } from '@shared/ui';

// ❌ НЕПРАВИЛЬНО (нарушение граф зависимостей)
// В features нельзя импортировать из widgets
import { Header } from '../../widgets/header';

// ❌ НЕПРАВИЛЬНО (импорт из внутренностей)
// Используй только экспорты из index.ts
import { useAuthInternal } from '../../features/auth/model/internal/useAuthInternal';
```

---

## 🚀 Команды

```bash
# Запуск dev сервера
npm start

# Создать production build
npm run build

# Запустить тесты
npm test

# Вывести конфиг (если нужно)
npm run eject
```

---

## 💡 Чек-лист для новой фичи

- [ ] Создал папку `src/features/MyFeature/`
- [ ] Создал структуру: `ui/`, `model/`, `api/`, `types.ts`
- [ ] Создал `index.ts` с публичным API
- [ ] Все импорты используют aliases (`@features/`, `@shared/`)
- [ ] Компоненты не зависят от других features
- [ ] Добавил документацию в README
