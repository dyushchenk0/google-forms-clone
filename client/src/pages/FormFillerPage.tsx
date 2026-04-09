import {Link, useParams} from 'react-router-dom'
import {QuestionType} from '../generated/graphql'
import {useFormFiller} from '../hooks/useFormFiller'
import styles from '../styles/FormFillerPage.module.css'

export function FormFillerPage() {
  const {id} = useParams<{ id: string }>()
  const {
    form, isLoading, isError,
    answers, isSubmitting, isSubmitted, submitError, validationError,
    setAnswer, setDateAnswer, toggleCheckbox, submit,
    dateErrors,
  } = useFormFiller(id!)

  if (isLoading) return <div className={styles.state}>Loading...</div>
  if (isError || !form) return <div className={styles.state}>Form not
    found</div>
  if (isSubmitted) return (
    <div className={styles.success}>
      <p>The form has been successfully submitted!</p>
      <Link to="/" className={styles.homeBtn}>Home</Link>
    </div>
  )

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{form.title}</h1>
      {form.description &&
        <p className={styles.description}>{form.description}</p>}

      <div className={styles.questions}>
        {form.questions.map(q => (
          <div key={q.id} className={styles.card}>
            <p className={styles.questionTitle}>{q.title}</p>

            {q.type === QuestionType.Text && (
              <input
                className={styles.textInput}
                value={(answers[q.id] as string) ?? ''}
                onChange={e => setAnswer(q.id, e.target.value)}
              />
            )}

            {q.type === QuestionType.Date && (
              <>
                <input
                  type="date"
                  className={styles.dateInput}
                  min="1900-01-01"
                  max="2100-12-31"
                  value={(answers[q.id] as string) ?? ''}
                  onChange={e => setDateAnswer(q.id, e.target.value)}
                />
                {dateErrors[q.id] && (
                  <p className={styles.fieldError}>{dateErrors[q.id]}</p>
                )}
              </>
            )}

            {q.type === QuestionType.MultipleChoice && (
              <div className={styles.options}>
                {(q.options ?? []).map(opt => (
                  <label key={opt} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={q.id}
                      value={opt ?? ''}
                      checked={answers[q.id] === opt}
                      onChange={() => setAnswer(q.id, opt ?? '')}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.type === QuestionType.Checkbox && (
              <div className={styles.options}>
                {(q.options ?? []).map((opt, oi) => (
                  <label key={`${oi}__${opt}`} className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      checked={((answers[q.id] as string[]) ?? []).includes(`${oi}__${opt}`)}
                      onChange={() => toggleCheckbox(q.id, opt ?? '', oi)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {validationError &&
        <p className={styles.error}>Please fill in all fields</p>}
      {submitError &&
        <p className={styles.error}>An error occurred while sending. Please try
          again.</p>}

      <button
        className={styles.submitBtn}
        onClick={submit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </div>
  )
}