import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { programService, type ProgramResponse } from '../services/programService';

const SearchPrograms: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    programService
      .getAllPrograms()
      .then((data) => {
        setPrograms(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFiltered(programs);
    } else {
      const term = searchTerm.toLowerCase();
      setFiltered(
        programs.filter((p) =>
          p.programName.toLowerCase().includes(term)
        )
      );
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFiltered(programs);
  };

  const getTypeName = (p: ProgramResponse) =>
    i18n.language === 'fr' ? p.programTypeNameFr : p.programTypeName;

  if (loading) {
    return (
      <section aria-labelledby="search-title">
        <h1 id="search-title" className="ontario-h1">{t('search.title')}</h1>
        <p>{t('search.loading')}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-labelledby="search-title">
        <h1 id="search-title" className="ontario-h1">{t('search.title')}</h1>
        <div className="ontario-alert ontario-alert--error" role="alert">
          <div className="ontario-alert__body">
            <p className="ontario-alert__message">{t('search.loadingError')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="search-title">
      <h1 id="search-title" className="ontario-h1">
        {t('search.title')}
      </h1>

      <form onSubmit={handleSearch} className="ontario-form-group" role="search">
        <div className="ontario-search-container">
          <label htmlFor="searchInput" className="ontario-label ontario-label--visuallyhidden">
            {t('search.title')}
          </label>
          <input
            className="ontario-input"
            type="search"
            id="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search.searchPlaceholder')}
            aria-label={t('search.searchPlaceholder')}
          />
          <button type="submit" className="ontario-button ontario-button--primary">
            {t('search.searchButton')}
          </button>
          <button
            type="button"
            className="ontario-button ontario-button--secondary"
            onClick={handleClear}
          >
            {t('search.clearButton')}
          </button>
        </div>
      </form>

      {filtered.length === 0 ? (
        <p>{t('search.noResults')}</p>
      ) : (
        <div className="ontario-table-container">
          <table className="ontario-table">
            <caption className="ontario-show-for-sr">{t('search.title')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('search.table.id')}</th>
                <th scope="col">{t('search.table.programName')}</th>
                <th scope="col">{t('search.table.programType')}</th>
                <th scope="col">{t('search.table.status')}</th>
                <th scope="col">{t('search.table.submittedAt')}</th>
                <th scope="col">{t('search.table.createdBy')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.programName}</td>
                  <td>{getTypeName(p)}</td>
                  <td>{t(`status.${p.status}`)}</td>
                  <td>{new Date(p.submittedAt).toLocaleDateString(i18n.language)}</td>
                  <td>{p.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default SearchPrograms;
