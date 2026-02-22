import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { programService, type ProgramResponse } from '../services/programService';

const ReviewDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    programService
      .getAllPrograms()
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const getTypeName = (p: ProgramResponse) =>
    i18n.language === 'fr' ? p.programTypeNameFr : p.programTypeName;

  if (loading) {
    return (
      <section aria-labelledby="review-dashboard-title">
        <h1 id="review-dashboard-title" className="ontario-h1">{t('review.title')}</h1>
        <p>{t('review.loading')}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-labelledby="review-dashboard-title">
        <h1 id="review-dashboard-title" className="ontario-h1">{t('review.title')}</h1>
        <div className="ontario-alert ontario-alert--error" role="alert">
          <div className="ontario-alert__body">
            <p className="ontario-alert__message">{t('review.loadingError')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="review-dashboard-title">
      <h1 id="review-dashboard-title" className="ontario-h1">
        {t('review.title')}
      </h1>
      <p className="ontario-lead-statement">{t('review.description')}</p>

      {programs.length === 0 ? (
        <p>{t('review.noPrograms')}</p>
      ) : (
        <div className="ontario-table-container">
          <table className="ontario-table" aria-label={t('review.title')}>
            <thead>
              <tr>
                <th scope="col">{t('review.table.id')}</th>
                <th scope="col">{t('review.table.programName')}</th>
                <th scope="col">{t('review.table.programType')}</th>
                <th scope="col">{t('review.table.status')}</th>
                <th scope="col">{t('review.table.submittedAt')}</th>
                <th scope="col">{t('review.table.createdBy')}</th>
                <th scope="col">{t('review.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id}>
                  <td>{program.id}</td>
                  <td>{program.programName}</td>
                  <td>{getTypeName(program)}</td>
                  <td>
                    <span className={`ontario-badge ontario-badge--${program.status.toLowerCase()}`}>
                      {t(`status.${program.status}`)}
                    </span>
                  </td>
                  <td>{new Date(program.submittedAt).toLocaleDateString(i18n.language)}</td>
                  <td>{program.createdBy}</td>
                  <td>
                    <Link
                      to={`/review/${program.id}`}
                      className="ontario-button ontario-button--secondary ontario-button--small"
                    >
                      {t('review.table.reviewButton')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ReviewDashboard;
