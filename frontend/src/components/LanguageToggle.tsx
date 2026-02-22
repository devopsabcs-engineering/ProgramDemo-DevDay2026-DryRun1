import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <button
      className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
      onClick={toggleLanguage}
      aria-label={t('header.languageToggle')}
      type="button"
    >
      <abbr title={t('header.languageToggle')} className="ontario-show-for-small-only">
        {i18n.language === 'en' ? 'FR' : 'EN'}
      </abbr>
      <span className="ontario-show-for-medium">
        {t('header.languageToggle')}
      </span>
    </button>
  );
};

export default LanguageToggle;
