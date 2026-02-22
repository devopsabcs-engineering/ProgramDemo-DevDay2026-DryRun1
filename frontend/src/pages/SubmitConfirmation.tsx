import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import type { ProgramResponse } from '../services/programService';

const SubmitConfirmation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const program = (location.state as { program: ProgramResponse } | null)?.program;

  if (!program) {
    return (
      <section>
        <h1 className="ontario-h1">{t('confirmation.title')}</h1>
        <p>{t('confirmation.message')}</p>
        <Link to="/submit" className="ontario-button ontario-button--secondary">
          {t('confirmation.submitAnother')}
        </Link>
      </section>
    );
  }

  const programTypeName =
    i18n.language === 'fr' ? program.programTypeNameFr : program.programTypeName;

  return (
    <section aria-labelledby="confirmation-title">
      <h1 id="confirmation-title" className="ontario-h1">
        {t('confirmation.title')}
      </h1>

      <div className="ontario-alert ontario-alert--success" role="status" aria-live="polite">
        <div className="ontario-alert__body">
          <p className="ontario-alert__message">{t('confirmation.message')}</p>
        </div>
      </div>

      <h2 className="ontario-h3">{t('confirmation.details')}</h2>
      <table className="ontario-table ontario-table--simple">
        <tbody>
          <tr>
            <th scope="row">{t('confirmation.programName')}</th>
            <td>{program.programName}</td>
          </tr>
          <tr>
            <th scope="row">{t('confirmation.programType')}</th>
            <td>{programTypeName}</td>
          </tr>
          <tr>
            <th scope="row">{t('confirmation.status')}</th>
            <td>{t(`status.${program.status}`)}</td>
          </tr>
          <tr>
            <th scope="row">{t('confirmation.submittedAt')}</th>
            <td>{new Date(program.submittedAt).toLocaleString(i18n.language)}</td>
          </tr>
          <tr>
            <th scope="row">{t('confirmation.submittedBy')}</th>
            <td>{program.createdBy}</td>
          </tr>
        </tbody>
      </table>

      <div className="ontario-button-group">
        <Link to="/submit" className="ontario-button ontario-button--secondary">
          {t('confirmation.submitAnother')}
        </Link>
        <Link to="/search" className="ontario-button ontario-button--tertiary">
          {t('confirmation.searchPrograms')}
        </Link>
      </div>
    </section>
  );
};

export default SubmitConfirmation;
