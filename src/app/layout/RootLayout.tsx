import React from 'react';
import { Menu } from '../../widgets';
import './RootLayout.css';

const MENU_LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Крестики-Нолики', href: '/tictactoe' },
  { label: 'О себе', href: '/about' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/contacts' },
];

export const RootLayout: React.FC = () => {
  return (
    <div className="home-container">
      <Menu links={MENU_LINKS} variant="vertical" />
    </div>
  );
};

