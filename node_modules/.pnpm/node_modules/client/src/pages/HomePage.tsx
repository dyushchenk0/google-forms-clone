import { Link } from 'react-router-dom'
import { useGetFormsQuery } from '../api/formsApi'
import styles from '../styles/HomePage.module.css'

export function HomePage() {
  const { data, isLoading, isError } = useGetFormsQuery()

  if (isLoading) return <div className={styles.state}>Loading...</div>
  if (isError) return <div className={styles.state}>Form loading error</div>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>My Forms</h1>
        <Link to="/forms/new" className={styles.createBtn}>Create new form</Link>
      </div>

      {data?.forms.length === 0 && (
        <p className={styles.empty}>There are no forms yet. Be the first to create one!</p>
      )}

      <ul className={styles.list}>
        {data?.forms.map((form) => (
          <li key={form.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <h2>{form.title}</h2>
              {form.description && <p>{form.description}</p>}
            </div>
            <div className={styles.cardActions}>
              <Link to={`/forms/${form.id}/fill`} className={styles.linkFill}>Fill out</Link>
              <Link to={`/forms/${form.id}/responses`} className={styles.linkResponses}>Answers</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}