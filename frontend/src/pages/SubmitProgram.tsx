import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  programService,
  type ProgramType,
  type ProgramSubmitRequest,
} from '../services/programService';

interface FormErrors {
  programName?: string;
  programDescription?: string;
  programTypeId?: string;
  createdBy?: string;
}

const SubmitProgram: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [programTypes, setProgramTypes] = useState<ProgramType[]>([]);
  const [formData, setFormData] = useState<ProgramSubmitRequest>({
    programName: '',
    programDescription: '',
    programTypeId: 0,
    createdBy: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    programService.getProgramTypes().then(setProgramTypes).catch(console.error);
  }, []);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.programName.trim()) {
      newErrors.programName = t('submit.validation.nameRequired');
    } else if (formData.programName.length > 255) {
      newErrors.programName = t('submit.validation.nameMaxLength');
    }
    if (!formData.programDescription.trim()) {
      newErrors.programDescription = t('submit.validation.descriptionRequired');
    } else if (formData.programDescription.length > 4000) {
      newErrors.programDescription = t('submit.validation.descriptionMaxLength');
    }
    if (!formData.programTypeId) {
      newErrors.programTypeId = t('submit.validation.typeRequired');
    }
    if (!formData.createdBy.trim()) {
      newErrors.createdBy = t('submit.validation.createdByRequired');
    } else if (formData.createdBy.length > 255) {
      newErrors.createdBy = t('submit.validation.createdByMaxLength');
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const result = await programService.submitProgram(formData);
      navigate('/submit/confirmation', { state: { program: result } });
    } catch (err) {
      console.error('Submit failed:', err);
      setSubmitting(false);
    }
  };

  const getTypeName = (pt: ProgramType) =>
    i18n.language === 'fr' ? pt.typeNameFr : pt.typeName;

  return (
    <section aria-labelledby="submit-title">
      <h1 id="submit-title" className="ontario-h1">
        {t('submit.title')}
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`ontario-form-group ${errors.programName ? 'ontario-form-group--error' : ''}`}>
          <label className="ontario-label" htmlFor="programName">
            {t('submit.programName')}
            <span className="ontario-label__flag">({t('submit.required')})</span>
          </label>
          {errors.programName && (
            <div className="ontario-error-messaging" role="alert" id="programName-error">
              <span className="ontario-error-messaging__content">{errors.programName}</span>
            </div>
          )}
          <input
            className="ontario-input"
            type="text"
            id="programName"
            aria-describedby={errors.programName ? 'programName-error' : undefined}
            name="programName"
            value={formData.programName}
            onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
            placeholder={t('submit.programNamePlaceholder')}
            maxLength={255}
            required
            aria-required="true"
            aria-invalid={!!errors.programName}
          />
        </div>

        <div className={`ontario-form-group ${errors.programDescription ? 'ontario-form-group--error' : ''}`}>
          <label className="ontario-label" htmlFor="programDescription">
            {t('submit.programDescription')}
            <span className="ontario-label__flag">({t('submit.required')})</span>
          </label>
          {errors.programDescription && (
            <div className="ontario-error-messaging" role="alert" id="programDescription-error">
              <span className="ontario-error-messaging__content">{errors.programDescription}</span>
            </div>
          )}
          <textarea
            className="ontario-input ontario-textarea"
            id="programDescription"
            aria-describedby={errors.programDescription ? 'programDescription-error' : undefined}
            name="programDescription"
            value={formData.programDescription}
            onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            placeholder={t('submit.programDescriptionPlaceholder')}
            maxLength={4000}
            rows={5}
            required
            aria-required="true"
            aria-invalid={!!errors.programDescription}
          />
        </div>

        <div className={`ontario-form-group ${errors.programTypeId ? 'ontario-form-group--error' : ''}`}>
          <label className="ontario-label" htmlFor="programTypeId">
            {t('submit.programType')}
            <span className="ontario-label__flag">({t('submit.required')})</span>
          </label>
          {errors.programTypeId && (
            <div className="ontario-error-messaging" role="alert" id="programTypeId-error">
              <span className="ontario-error-messaging__content">{errors.programTypeId}</span>
            </div>
          )}
          <select
            className="ontario-input ontario-dropdown"
            id="programTypeId"
            aria-describedby={errors.programTypeId ? 'programTypeId-error' : undefined}
            name="programTypeId"
            value={formData.programTypeId}
            onChange={(e) => setFormData({ ...formData, programTypeId: Number(e.target.value) })}
            required
            aria-required="true"
            aria-invalid={!!errors.programTypeId}
          >
            <option value={0} disabled>
              {t('submit.programTypeSelect')}
            </option>
            {programTypes.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {getTypeName(pt)}
              </option>
            ))}
          </select>
        </div>

        <div className={`ontario-form-group ${errors.createdBy ? 'ontario-form-group--error' : ''}`}>
          <label className="ontario-label" htmlFor="createdBy">
            {t('submit.yourName')}
            <span className="ontario-label__flag">({t('submit.required')})</span>
          </label>
          {errors.createdBy && (
            <div className="ontario-error-messaging" role="alert" id="createdBy-error">
              <span className="ontario-error-messaging__content">{errors.createdBy}</span>
            </div>
          )}
          <input
            className="ontario-input"
            type="text"
            id="createdBy"
            aria-describedby={errors.createdBy ? 'createdBy-error' : undefined}
            name="createdBy"
            value={formData.createdBy}
            onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
            placeholder={t('submit.yourNamePlaceholder')}
            maxLength={255}
            required
            aria-required="true"
            aria-invalid={!!errors.createdBy}
          />
        </div>

        <button
          type="submit"
          className="ontario-button ontario-button--primary"
          disabled={submitting}
        >
          {submitting ? t('submit.submitting') : t('submit.submitButton')}
        </button>
      </form>
    </section>
  );
};

export default SubmitProgram;
