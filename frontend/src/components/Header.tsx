import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="ontario-header" role="banner">
      <div className="ontario-header__container">
        <a href="#main-content" className="ontario-header__skip-nav">
          {t('app.skipToContent')}
        </a>
        <div className="ontario-header__logo-container">
          <a href="https://www.ontario.ca" className="ontario-header__logo-link">
            <img
              className="ontario-header__logo-image"
              src="https://designsystem.ontario.ca/assets/ontario-logo--desktop.svg"
              alt={t('header.governmentOf')}
            />
          </a>
        </div>
        <div className="ontario-header__nav-right-container">
          <LanguageToggle />
        </div>
      </div>
      <nav className="ontario-header__nav" aria-label={t('nav.mainNavigation')}>
        <div className="ontario-header__container">
          <ul className="ontario-header__nav-list">
            <li className="ontario-header__nav-item">
              <Link to="/" className="ontario-header__nav-link">
                {t('nav.home')}
              </Link>
            </li>
            <li className="ontario-header__nav-item">
              <Link to="/submit" className="ontario-header__nav-link">
                {t('nav.submit')}
              </Link>
            </li>
            <li className="ontario-header__nav-item">
              <Link to="/search" className="ontario-header__nav-link">
                {t('nav.search')}
              </Link>
            </li>
            <li className="ontario-header__nav-item">
              <Link to="/review" className="ontario-header__nav-link">
                {t('nav.review')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
