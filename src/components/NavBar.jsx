import { useState, useEffect } from 'react';
import '../styles/navbar.css';

const navItems = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Experience', href: '#experience' },
  { num: '03', label: 'Projects', href: '#projects' },
  { num: '04', label: 'Skills', href: '#skills' },
  { num: '05', label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Glassmorphism effect after scrolling past 50px
      setScrolled(currentScrollY > 50);

      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`} id="navbar">
        <a href="#" className="nav-logo" onClick={closeMobile}>
          <span className="logo-bracket">{'<'}</span>
          A
          <span className="logo-bracket">{' />'}</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.num}>
              <a href={item.href}>
                <span className="nav-number">{item.num}.</span>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="https://www.thebrokenbackpack.com/" target="_blank" rel="noopener noreferrer" className="nav-traveller-btn">
              <span className="dot"></span> TRAVELLER BUTTON
            </a>
          </li>
        </ul>

        <button
          className={`nav-hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={closeMobile}></div>
      <div className={`nav-mobile-menu ${mobileOpen ? 'open' : ''}`} id="nav-mobile-menu">
        {navItems.map((item) => (
          <a key={item.num} href={item.href} onClick={closeMobile}>
            <span className="nav-number">{item.num}.</span>
            {item.label}
          </a>
        ))}
        <a href="https://www.thebrokenbackpack.com/" target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="nav-traveller-btn-mobile">
          <span className="dot"></span> TRAVELLER BUTTON
        </a>
      </div>
    </>
  );
}
