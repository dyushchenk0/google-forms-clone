import {useParams, Link} from 'react-router-dom'
import {useFormResponses} from '../hooks/useFormResponses'
import styles from '../styles/FormResponsesPage.module.css'

export function FormResponsesPage() {
  const {id} = useParams<{ id: string }>()
  const {
    form,
    responses,
    questionsMap,
    isLoading,
    isError
  } = useFormResponses(id!)

  if (isLoading) return <div className={styles.state}>Loading...</div>
  if (isError || !form) return <div className={styles.state}>Form not
    found</div>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>← Back</Link>
        <h1>{form.title} - ans.</h1>
        <span className={styles.count}>{responses.length} ans.</span>
      </div>

      {responses.length === 0 && (
        <p className={styles.empty}>No replies yet.</p>
      )}

      <div className={styles.responses}>
        {responses.map((response, index) => (
          <div key={response.id} className={styles.card}>
            <p className={styles.responseTitle}>
              Answer #{index + 1}
              <span className={styles.date}>
                {new Date(response.submittedAt).toLocaleString('ua')}
              </span>
            </p>

            <div className={styles.answers}>
              {response.answers.map(answer => (
                <div key={answer.questionId} className={styles.answerRow}>
                  <p className={styles.question}>
                    {questionsMap[answer.questionId] ?? answer.questionId}
                  </p>
                  <p className={styles.answer}>
                    {answer.value.length > 0 ? answer.value.join(', ') : '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}