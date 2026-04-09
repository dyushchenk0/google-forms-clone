import { store } from "./store.js";
import { Form, Response } from "./schema.js";
import { randomUUID } from "crypto";

export const resolvers = {
  Query: {
    forms: () => store.forms,

    form: (_: unknown, { id }: { id: string }) =>
      store.forms.find((f) => f.id === id) ?? null,

    responses: (_: unknown, { formId }: { formId: string }) =>
      store.responses.filter((r) => r.formId === formId),
  },

  Mutation: {
    createForm: (
      _: unknown,
      {
        title,
        description,
        questions,
      }: {
        title: string;
        description?: string;
        questions?: Array<{
          title: string;
          type: string;
          options?: string[];
        }>;
      }
    ): Form => {
      const form: Form = {
        id: randomUUID(),
        title,
        description,
        questions: (questions ?? []).map((q) => ({
          id: randomUUID(),
          title: q.title,
          type: q.type as Form["questions"][number]["type"],
          options: q.options,
        })),
        createdAt: new Date().toISOString(),
      };

      store.forms.push(form);
      return form;
    },

    submitResponse: (
      _: unknown,
      {
        formId,
        answers,
      }: {
        formId: string;
        answers: Array<{ questionId: string; value: string[] }>;
      }
    ): Response => {
      const form = store.forms.find((f) => f.id === formId);
      if (!form) throw new Error(`Form with id ${formId} not found`);

      const response: Response = {
        id: randomUUID(),
        formId,
        answers,
        submittedAt: new Date().toISOString(),
      };

      store.responses.push(response);
      return response;
    },
  },
};