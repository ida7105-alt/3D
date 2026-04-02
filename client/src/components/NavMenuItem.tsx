import React from 'react';

interface NavMenuItemProps {
  englishText: string;
  chineseText: string;
  isMobile?: boolean;
}

/**
 * Reusable navigation menu item component
 * Handles both desktop and mobile menu items with hover effects
 */
export const NavMenuItem: React.FC<NavMenuItemProps> = ({
  englishText,
  chineseText,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    transition: 'all 0.3s ease',
    color: isHovered ? '#3b82f6' : 'rgb(255, 255, 255)',
    textAlign: isMobile ? 'center' : 'left',
  };

  const englishStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: isMobile ? '16px' : '14px',
    letterSpacing: '0.1em',
    fontWeight: 400,
    color: 'inherit',
    lineHeight: isMobile ? '1.2' : 'inherit',
  };

  const chineseStyle: React.CSSProperties = {
    fontFamily: "'Noto Sans TC', sans-serif",
    fontSize: isMobile ? '14px' : '14px',
    color: 'inherit',
    fontWeight: 400,
    lineHeight: isMobile ? '1.4' : 'inherit',
    marginTop: isMobile ? '4px' : '0',
  };

  return (
    <a
      href="#"
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={englishStyle}>{englishText}</div>
      <div style={chineseStyle}>{chineseText}</div>
    </a>
  );
};
