import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="home-title">
      <h1 id="home-title" className="ontario-h1">
        {t('home.title')}
      </h1>
      <p className="ontario-lead-statement">
        {t('home.description')}
      </p>

      <div className="ontario-row">
        <div className="ontario-columns ontario-large-6 ontario-medium-6 ontario-small-12">
          <div className="ontario-card ontario-card--default">
            <div className="ontario-card__content">
              <h2 className="ontario-h3">{t('home.citizenTitle')}</h2>
              <p>{t('home.citizenDescription')}</p>
              <p>
                <Link to="/submit" className="ontario-button ontario-button--primary">
                  {t('home.submitLink')}
                </Link>
              </p>
              <p>
                <Link to="/search" className="ontario-button ontario-button--secondary">
                  {t('home.searchLink')}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="ontario-columns ontario-large-6 ontario-medium-6 ontario-small-12">
          <div className="ontario-card ontario-card--default">
            <div className="ontario-card__content">
              <h2 className="ontario-h3">{t('home.ministryTitle')}</h2>
              <p>{t('home.ministryDescription')}</p>
              <p>
                <Link to="/review" className="ontario-button ontario-button--secondary">
                  {t('home.reviewLink')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
