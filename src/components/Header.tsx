import React from 'react';

export type HeaderProps = {
  title?: string;
};

export const Header: React.FC<HeaderProps> = ({ title = 'My App' }) => {
  return (
    <header style={{ padding: '1rem', background: '#f5f5f5' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <nav>
          <a href="#" style={{ margin: '0 0.5rem', textDecoration: 'none', color: '#0366d6' }}>Home</a>
          <a href="#" style={{ margin: '0 0.5rem', textDecoration: 'none', color: '#0366d6' }}>About</a>
          <a href="#" style={{ margin: '0 0.5rem', textDecoration: 'none', color: '#0366d6' }}>Services</a>
          <a href="#" style={{ margin: '0 0.5rem', textDecoration: 'none', color: '#0366d6' }}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
