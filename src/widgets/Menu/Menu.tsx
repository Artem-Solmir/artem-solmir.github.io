import React from 'react';
import './Menu.css';

export interface MenuLink {
  label: string;
  href: string;
}

interface MenuProps {
  links: MenuLink[];
  variant?: 'horizontal' | 'vertical';
}

export const Menu: React.FC<MenuProps> = ({ links, variant = 'horizontal' }) => {
  return (
    <nav className={`menu menu-${variant}`}>
      <ul className={`menu-list menu-list-${variant}`}>
        {links.map((link) => (
          <li key={link.href} className="menu-item">
            <a href={link.href} className="menu-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
