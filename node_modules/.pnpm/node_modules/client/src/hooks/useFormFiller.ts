import { useState } from 'react'
import { useGetFormQuery, useSubmitResponseMutation } from '../api/formsApi'

type Answers = Record<string, string | string[]>

export function useFormFiller(formId: string) {
  const { data, isLoading, isError } = useGetFormQuery({ id: formId })
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation()

  const [answers, setAnswers] = useState<Answers>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [dateErrors, setDateErrors] = useState<Record<string, string>>({})
  const [validationError, setValidationError] = useState(false)

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    setValidationError(false)
  }

  const setDateAnswer = (questionId: string, value: string) => {
    if (!value) {
      setAnswer(questionId, '')
      setDateErrors(prev => ({ ...prev, [questionId]: '' }))
      return
    }
    const [yearStr] = value.split('-')
    if (yearStr.length > 4) {
      setDateErrors(prev => ({ ...prev, [questionId]: 'Year must be 4 digits max' }))
      return
    }
    setDateErrors(prev => ({ ...prev, [questionId]: '' }))
    setAnswer(questionId, value)
  }

  const toggleCheckbox = (questionId: string, option: string, index: number) => {
    const key = `${index}__${option}`
    const current = (answers[questionId] as string[]) ?? []
    const updated = current.includes(key)
      ? current.filter(v => v !== key)
      : [...current, key]
    setAnswer(questionId, updated)
  }

  const submit = async () => {
    if (!data?.form) return

    const hasEmpty = data.form.questions.some(q => {
      const answer = answers[q.id]
      if (Array.isArray(answer)) return answer.length === 0
      return !answer || !String(answer).trim()
    })

    if (hasEmpty) {
      setValidationError(true)
      return
    }

    const answerInputs = data.form.questions.map(q => ({
      questionId: q.id,
      value: Array.isArray(answers[q.id])
        ? (answers[q.id] as string[]).map(v => v.replace(/^\d+__/, ''))
        : [(answers[q.id] as string) ?? ''],
    }))

    const result = await submitResponse({ formId, answers: answerInputs })
    if ('data' in result) {
      setIsSubmitted(true)
    } else {
      setSubmitError(true)
    }
  }

  return {
    form: data?.form,
    isLoading,
    isError,
    answers,
    isSubmitting,
    isSubmitted,
    submitError,
    validationError,
    setAnswer,
    setDateAnswer,
    dateErrors,
    toggleCheckbox,
    submit,
  }
}