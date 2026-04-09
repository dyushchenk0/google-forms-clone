import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateFormMutation } from '../api/formsApi'
import { QuestionType } from '../generated/graphql'
import type { QuestionInput } from '../generated/graphql'

export interface LocalQuestion extends QuestionInput {
  localId: string
}

export function useFormBuilder() {
  const navigate = useNavigate()
  const [createForm, { isLoading, isError }] = useCreateFormMutation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<LocalQuestion[]>([])
  const [noQuestionsError, setNoQuestionsError] = useState(false)

  const addQuestion = () => {
    setNoQuestionsError(false)
    setQuestions(prev => [...prev, {
      localId: crypto.randomUUID(),
      title: '',
      type: QuestionType.Text,
      options: [],
    }])
  }

  const updateQuestion = (localId: string, patch: Partial<QuestionInput>) => {
    setQuestions(prev => prev.map(q =>
      q.localId === localId ? { ...q, ...patch } : q
    ))
  }

  const removeQuestion = (localId: string) => {
    setQuestions(prev => prev.filter(q => q.localId !== localId))
  }

  const addOption = (localId: string) => {
    setQuestions(prev => prev.map(q =>
      q.localId === localId ? { ...q, options: [...(q.options ?? []), ''] } : q
    ))
  }

  const updateOption = (localId: string, index: number, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.localId !== localId) return q
      const options = [...(q.options ?? [])]
      options[index] = value
      return { ...q, options }
    }))
  }

  const removeOption = (localId: string, index: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.localId !== localId) return q
      const options = (q.options ?? []).filter((_, i) => i !== index)
      return { ...q, options }
    }))
  }

  const submit = async () => {
    if (!title.trim()) return
    if (questions.length === 0) return
    if (questions.some(q => hasOptions(q.type) && (q.options ?? []).length === 0)) return
    if (questions.some(q => hasOptions(q.type) && (q.options ?? []).some(opt => !opt.trim()))) return
    if (questions.some(q => !q.title.trim())) return

    setNoQuestionsError(false)

    const result = await createForm({
      title,
      description: description.trim() || undefined,
      questions: questions.map(({ localId, ...q }) => q),
    })
    if ('data' in result) {
      navigate(`/forms/${result.data.createForm.id}/fill`)
    }
  }

  const hasOptions = (type: QuestionType) =>
    type === QuestionType.MultipleChoice || type === QuestionType.Checkbox

  return {
    title, setTitle,
    description, setDescription,
    questions,
    isLoading,
    isError,
    addQuestion,
    updateQuestion,
    removeQuestion,
    noQuestionsError,
    addOption,
    updateOption,
    removeOption,
    hasOptions,
    submit,
  }
}