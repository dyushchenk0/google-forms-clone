import { useGetFormQuery, useGetResponsesQuery } from '../api/formsApi'

export function useFormResponses(formId: string) {
  const { data: formData, isLoading: isFormLoading, isError: isFormError } = useGetFormQuery({ id: formId })
  const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({ formId })

  const isLoading = isFormLoading || isResponsesLoading

  const questionsMap = Object.fromEntries(
    (formData?.form?.questions ?? []).map(q => [q.id, q.title])
  )

  return {
    form: formData?.form,
    responses: responsesData?.responses ?? [],
    questionsMap,
    isLoading,
    isError: isFormError,
  }
}