import React, { useEffect, useState } from 'react';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo">
          <Film size={24} />
          <span>AniSphere</span>
        </Link>
      </div>
    </header>
  );
}