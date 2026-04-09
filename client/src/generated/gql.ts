/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n  }\n}": typeof types.CreateFormDocument,
    "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}": typeof types.GetFormsDocument,
};
const documents: Documents = {
    "mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n  }\n}": types.CreateFormDocument,
    "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}": types.GetFormsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n  }\n}"): (typeof documents)["mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    id\n    formId\n    submittedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}"): (typeof documents)["query GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    id\n    title\n    description\n    createdAt\n    questions {\n      id\n      title\n      type\n      options\n    }\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    id\n    formId\n    submittedAt\n    answers {\n      questionId\n      value\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;