import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery } from "./baseQuery";
import type {
  GetFormsQuery,
  GetFormQuery,
  GetFormQueryVariables,
  GetResponsesQuery,
  GetResponsesQueryVariables,
  CreateFormMutation,
  CreateFormMutationVariables,
  SubmitResponseMutation,
  SubmitResponseMutationVariables,
} from "../generated/graphql";

const GetFormsDocument = `
  query GetForms {
    forms {
      id
      title
      description
      createdAt
    }
  }
`;

const GetFormDocument = `
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      title
      description
      createdAt
      questions {
        id
        title
        type
        options
      }
    }
  }
`;

const GetResponsesDocument = `
  query GetResponses($formId: ID!) {
    responses(formId: $formId) {
      id
      formId
      submittedAt
      answers {
        questionId
        value
      }
    }
  }
`;

const CreateFormDocument = `
  mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {
    createForm(title: $title, description: $description, questions: $questions) {
      id
      title
      description
      createdAt
      questions {
        id
        title
        type
        options
      }
    }
  }
`;

const SubmitResponseDocument = `
  mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
    submitResponse(formId: $formId, answers: $answers) {
      id
      formId
      submittedAt
    }
  }
`;

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: graphqlBaseQuery("http://localhost:4000"),
  tagTypes: ["Form", "Response"],
  endpoints: (builder) => ({
    getForms: builder.query<GetFormsQuery, void>({
      query: () => ({ document: GetFormsDocument }),
      providesTags: ["Form"],
    }),

    getForm: builder.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables }),
      providesTags: ["Form"],
    }),

    getResponses: builder.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables }),
      providesTags: ["Response"],
    }),

    createForm: builder.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables }),
      invalidatesTags: ["Form"],
    }),

    submitResponse: builder.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
      invalidatesTags: ["Response"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;