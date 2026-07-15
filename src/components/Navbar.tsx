import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const navLinks = [
    { name: t('nav.home'), path: `${basePath}/` },
    { name: t('nav.about'), path: `${basePath}/about` },
    { name: t('nav.projects'), path: `${basePath}/projects` },
    { name: t('nav.resume'), path: `${basePath}/resume` },
    { name: t('nav.contact'), path: `${basePath}/contact` },
  ];

  const setLanguage = (lang: 'en' | 'id') => {
    if (lang === 'en' && !isEnglish) {
      i18n.changeLanguage('en');
      window.location.href = `/en${location.pathname === '/' ? '' : location.pathname}`;
    } else if (lang === 'id' && isEnglish) {
      i18n.changeLanguage('id');
      window.location.href = location.pathname.replace(/^\/en/, '') || '/';
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-base-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to={`${basePath}/`} className="w-10 h-10 bg-accent-red flex items-center justify-center font-bold text-lg rounded-sm text-white">
              A
            </Link>
            <Link to={`${basePath}/`} className="text-sm font-semibold tracking-[0.2em] uppercase hidden sm:block hover:text-white transition-colors">
              Adit Hardiansyah S.
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[11px] font-medium uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 ml-4">
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors ${!isEnglish ? 'bg-accent-red text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors ${isEnglish ? 'bg-accent-red text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
             <button
                onClick={() => setLanguage(isEnglish ? 'id' : 'en')}
                className="flex items-center text-gray-300 hover:text-white mr-4 p-2"
              >
                <Globe className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">{isEnglish ? 'ID' : 'EN'}</span>
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-base-800 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
