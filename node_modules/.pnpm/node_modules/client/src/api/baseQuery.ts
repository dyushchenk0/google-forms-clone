import type { BaseQueryFn } from "@reduxjs/toolkit/query";

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export const graphqlBaseQuery =
  (
    baseUrl: string
  ): BaseQueryFn<{ document: string; variables?: Record<string, unknown> }> =>
    async ({ document, variables }) => {
      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: document, variables }),
        });

        const result: GraphQLResponse<unknown> = await response.json();

        if (result.errors) {
          return { error: { status: "CUSTOM_ERROR", error: result.errors[0].message } };
        }

        return { data: result.data };
      } catch (error) {
        return { error: { status: "FETCH_ERROR", error: String(error) } };
      }
    };