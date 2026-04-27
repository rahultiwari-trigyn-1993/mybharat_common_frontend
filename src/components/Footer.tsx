import React from 'react';

export type FooterProps = {
  text?: string;
};

export const Footer: React.FC<FooterProps> = ({ text }) => {
  const defaultText = `© ${new Date().getFullYear()} My Company`;
  return (
    <footer style={{ padding: '1rem', background: '#f5f5f5' }}>
      <small>{text ?? defaultText}</small>
    </footer>
  );
};

export default Footer;
