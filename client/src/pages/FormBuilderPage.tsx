import { Link } from 'react-router-dom'
import { QuestionType } from '../generated/graphql'
import { useFormBuilder } from '../hooks/useFormBuilder'
import styles from '../styles/FormBuilderPage.module.css'

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Text',
  [QuestionType.MultipleChoice]: 'One option',
  [QuestionType.Checkbox]: 'Several options',
  [QuestionType.Date]: 'Date',
}

export function FormBuilderPage() {
  const {
    title, setTitle,
    description, setDescription,
    questions, isLoading,
    addQuestion, updateQuestion, removeQuestion, noQuestionsError,
    addOption, updateOption, removeOption,
    hasOptions, isError, submit,
  } = useFormBuilder()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>← Back</Link>
        <h1>New from</h1>
      </div>

      <div className={styles.card}>
        <input
          className={styles.titleInput}
          placeholder="Form Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className={styles.descInput}
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.questions}>
        {questions.map((q, qi) => (
          <div key={q.localId} className={styles.card}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNum}>Вопрос {qi + 1}</span>
              <button className={styles.removeBtn} onClick={() => removeQuestion(q.localId)}>✕</button>
            </div>

            <input
              className={styles.questionTitle}
              placeholder="Question text"
              value={q.title}
              onChange={e => updateQuestion(q.localId, { title: e.target.value })}
            />

            <select
              className={styles.typeSelect}
              value={q.type}
              onChange={e => updateQuestion(q.localId, { type: e.target.value as QuestionType, options: [] })}
            >
              {Object.values(QuestionType).map(t => (
                <option key={t} value={t}>{QUESTION_TYPE_LABELS[t]}</option>
              ))}
            </select>

            {hasOptions(q.type) && (
              <div className={styles.options}>
                {(q.options ?? []).map((opt, oi) => (
                  <div key={oi} className={styles.optionRow}>
                    <input
                      className={styles.optionInput}
                      placeholder={`Option ${oi + 1}`}
                      value={opt ?? ''}
                      onChange={e => updateOption(q.localId, oi, e.target.value)}
                    />
                    <button className={styles.removeBtn} onClick={() => removeOption(q.localId, oi)}>✕</button>
                  </div>
                ))}
                <button className={styles.addOptionBtn} onClick={() => addOption(q.localId)}>
                  + Add option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className={styles.addQuestionBtn} onClick={addQuestion}>
        + Добавить вопрос
      </button>

      <div className={styles.footer}>
        <button
          className={styles.submitBtn}
          onClick={submit}
          disabled={
            isLoading ||
            !title.trim() ||
            questions.length === 0 ||
            questions.some(q => !q.title.trim()) ||
            questions.some(q => hasOptions(q.type) && (q.options ?? []).length === 0) || // 👈 хотя бы 1 option
            questions.some(q => hasOptions(q.type) && (q.options ?? []).some(opt => !opt?.trim())) // пустой текст
          }
        >
          {isLoading ? 'Saving...' : 'Save form'}
        </button>
        {isError && <p className={styles.error}>Form save error</p> }
        {noQuestionsError && <p className={styles.error}>Form must have at least one question</p>}
      </div>
    </div>
  )
}