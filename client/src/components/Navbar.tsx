import React, { useState } from 'react';
import { NavMenuItem } from './NavMenuItem';
import { NAVBAR_CONFIG, NAVBAR_STYLES, NAVBAR_COLORS } from '@/constants/navbar';

/**
 * Navigation bar component with desktop and mobile menu support
 */
export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMenuClosing(false);
      setIsMobileMenuOpen(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuClosing(true);
    // 等待動畫完成後再移除菜單
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMenuClosing(false);
    }, 450); // 稍微延長以確保動畫完全完成
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 border-b ${NAVBAR_COLORS.BORDER}`}>
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
        {/* Logo Area */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={NAVBAR_CONFIG.LOGO_URL}
            alt="Logo"
            className={`${NAVBAR_STYLES.LOGO_HEIGHT} w-auto`}
          />
        </div>

        {/* Menu Items - Right Side (Desktop) */}
        <div className="hidden md:flex items-center" style={{ gap: NAVBAR_CONFIG.DESKTOP_GAP }}>
          {NAVBAR_CONFIG.MENU_ITEMS.map((item) => (
            <NavMenuItem
              key={item.english}
              englishText={item.english}
              chineseText={item.chinese}
              isMobile={false}
            />
          ))}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={toggleMobileMenu}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ width: `${NAVBAR_STYLES.HAMBURGER_SIZE}px`, height: `${NAVBAR_STYLES.HAMBURGER_LINE_HEIGHT}px`, backgroundColor: NAVBAR_COLORS.TEXT }}></div>
          <div style={{ width: `${NAVBAR_STYLES.HAMBURGER_SIZE}px`, height: `${NAVBAR_STYLES.HAMBURGER_LINE_HEIGHT}px`, backgroundColor: NAVBAR_COLORS.TEXT }}></div>
          <div style={{ width: `${NAVBAR_STYLES.HAMBURGER_SIZE}px`, height: `${NAVBAR_STYLES.HAMBURGER_LINE_HEIGHT}px`, backgroundColor: NAVBAR_COLORS.TEXT }}></div>
        </button>
      </div>

      {/* Mobile Menu - Slides in from right, slides out to left */}
      {isMobileMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 ${NAVBAR_COLORS.MOBILE_BG} backdrop-blur-sm z-30 ${isMenuClosing ? 'mobile-menu-exit' : 'mobile-menu-enter'}`} 
          style={{ 
            animation: isMenuClosing 
              ? 'slideOutToLeft 0.4s ease-in forwards' // 關閉時：向左滑出
              : 'slideInFromRight 0.4s ease-out forwards' // 打開時：從右側滑入
          }}
        >
          <div className="flex flex-col items-center justify-center px-8 py-8 gap-8 relative h-full">
            {NAVBAR_CONFIG.MENU_ITEMS.map((item) => (
              <NavMenuItem
                key={item.english}
                englishText={item.english}
                chineseText={item.chinese}
                isMobile={true}
              />
            ))}

            {/* Close button - Top right corner */}
            <button
              onClick={closeMobileMenu}
              style={{
                position: 'absolute',
                top: `${NAVBAR_STYLES.CLOSE_BUTTON_TOP}px`,
                right: `${NAVBAR_STYLES.CLOSE_BUTTON_RIGHT}px`,
                background: 'none',
                border: 'none',
                color: NAVBAR_COLORS.TEXT,
                fontSize: `${NAVBAR_STYLES.CLOSE_BUTTON_SIZE}px`,
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
