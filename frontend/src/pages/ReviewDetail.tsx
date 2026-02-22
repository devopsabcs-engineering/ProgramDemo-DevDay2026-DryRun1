import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { programService, type ProgramResponse } from '../services/programService';

const ReviewDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [program, setProgram] = useState<ProgramResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewerComments, setReviewerComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    programService
      .getProgramById(Number(id))
      .then((data) => {
        setProgram(data);
        setReviewerComments(data.reviewerComments ?? '');
        setLoading(false);
      })
      .catch(() => {
        setError(t('review.detail.notFound'));
        setLoading(false);
      });
  }, [id, t]);

  const getTypeName = (p: ProgramResponse) =>
    i18n.language === 'fr' ? p.programTypeNameFr : p.programTypeName;

  const handleReview = async (status: 'APPROVED' | 'REJECTED', e: FormEvent) => {
    e.preventDefault();
    if (!program) return;

    setSubmitting(true);
    setError(null);
    try {
      const updated = await programService.reviewProgram(program.id, {
        status,
        reviewerComments,
      });
      setProgram(updated);
      setReviewSuccess(true);
    } catch {
      setError(t('review.detail.reviewError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section aria-labelledby="review-detail-title">
        <h1 id="review-detail-title" className="ontario-h1">{t('review.detail.title')}</h1>
        <p>{t('review.loading')}</p>
      </section>
    );
  }

  if (error && !program) {
    return (
      <section aria-labelledby="review-detail-title">
        <h1 id="review-detail-title" className="ontario-h1">{t('review.detail.title')}</h1>
        <div className="ontario-alert ontario-alert--error" role="alert">
          <div className="ontario-alert__body">
            <p className="ontario-alert__message">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!program) return null;

  const isAlreadyReviewed = program.status === 'APPROVED' || program.status === 'REJECTED';

  return (
    <section aria-labelledby="review-detail-title">
      <h1 id="review-detail-title" className="ontario-h1">
        {t('review.detail.title')}
      </h1>

      {reviewSuccess && (
        <div className="ontario-alert ontario-alert--success" role="alert">
          <div className="ontario-alert__body">
            <p className="ontario-alert__message">
              {t(`review.detail.${program.status === 'APPROVED' ? 'approvedMessage' : 'rejectedMessage'}`)}
            </p>
          </div>
        </div>
      )}

      {error && program && (
        <div className="ontario-alert ontario-alert--error" role="alert">
          <div className="ontario-alert__body">
            <p className="ontario-alert__message">{error}</p>
          </div>
        </div>
      )}

      <div className="ontario-card">
        <h2 className="ontario-h3">{t('review.detail.programDetails')}</h2>
        <table className="ontario-table" aria-label={t('review.detail.programDetails')}>
          <tbody>
            <tr>
              <th scope="row">{t('review.detail.programId')}</th>
              <td>{program.id}</td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.programName')}</th>
              <td>{program.programName}</td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.programDescription')}</th>
              <td>{program.programDescription}</td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.programType')}</th>
              <td>{getTypeName(program)}</td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.status')}</th>
              <td>
                <span className={`ontario-badge ontario-badge--${program.status.toLowerCase()}`}>
                  {t(`status.${program.status}`)}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.submittedAt')}</th>
              <td>{new Date(program.submittedAt).toLocaleString(i18n.language)}</td>
            </tr>
            <tr>
              <th scope="row">{t('review.detail.submittedBy')}</th>
              <td>{program.createdBy}</td>
            </tr>
            {program.reviewedAt && (
              <tr>
                <th scope="row">{t('review.detail.reviewedAt')}</th>
                <td>{new Date(program.reviewedAt).toLocaleString(i18n.language)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form className="ontario-form-group" aria-label={t('review.detail.reviewForm')}>
        <fieldset>
          <legend className="ontario-h3">{t('review.detail.reviewAction')}</legend>

          <div className="ontario-form-group">
            <label htmlFor="reviewerComments" className="ontario-label">
              {t('review.detail.comments')}
            </label>
            <textarea
              id="reviewerComments"
              className="ontario-input ontario-textarea"
              value={reviewerComments}
              onChange={(e) => setReviewerComments(e.target.value)}
              rows={4}
              maxLength={4000}
              disabled={isAlreadyReviewed || submitting}
              aria-describedby="comments-hint"
            />
            <p id="comments-hint" className="ontario-hint">
              {t('review.detail.commentsHint')}
            </p>
          </div>

          <div className="ontario-button-group">
            <button
              type="submit"
              className="ontario-button ontario-button--primary"
              onClick={(e) => handleReview('APPROVED', e)}
              disabled={isAlreadyReviewed || submitting}
              aria-label={t('review.detail.approveButton')}
            >
              {submitting ? t('review.detail.processing') : t('review.detail.approveButton')}
            </button>
            <button
              type="button"
              className="ontario-button ontario-button--warning"
              onClick={(e) => handleReview('REJECTED', e)}
              disabled={isAlreadyReviewed || submitting}
              aria-label={t('review.detail.rejectButton')}
            >
              {submitting ? t('review.detail.processing') : t('review.detail.rejectButton')}
            </button>
          </div>
        </fieldset>
      </form>

      <div className="ontario-margin-top-24">
        <button
          type="button"
          className="ontario-button ontario-button--tertiary"
          onClick={() => navigate('/review')}
        >
          {t('review.detail.backToDashboard')}
        </button>
      </div>
    </section>
  );
};

export default ReviewDetail;
