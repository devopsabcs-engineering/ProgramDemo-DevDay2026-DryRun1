import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="ontario-footer" role="contentinfo">
      <div className="ontario-footer__container">
        <ul className="ontario-footer__links-container">
          <li>
            <a className="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">
              {t('footer.accessibility')}
            </a>
          </li>
          <li>
            <a className="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">
              {t('footer.privacy')}
            </a>
          </li>
          <li>
            <a className="ontario-footer__link" href="https://www.ontario.ca/page/terms-use">
              {t('footer.termsOfUse')}
            </a>
          </li>
        </ul>
        <div className="ontario-footer__copyright">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
