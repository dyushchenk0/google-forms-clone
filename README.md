# Google Forms Clone

A simplified Google Forms clone built as a monorepo with a GraphQL backend and a React + Redux frontend.

## Tech Stack

- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query, React Router, CSS Modules
- **Backend:** Node.js, GraphQL (Apollo Server), in-memory store
- **Monorepo:** pnpm workspaces
- **Code generation:** GraphQL Code Generator

## Project Structure

```
google-forms-clone/
├── client/          # React application
│   ├── src/
│   │   ├── api/         # RTK Query API (baseQuery, formsApi)
│   │   ├── generated/   # Auto-generated GraphQL types
│   │   ├── graphql/     # GraphQL queries and mutations
│   │   ├── hooks/       # Business logic hooks
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   └── styles/      # CSS Modules
│   └── package.json
├── server/          # GraphQL API
│   ├── src/
│   │   ├── schema.ts    # GraphQL schema + TypeScript interfaces
│   │   ├── resolvers.ts # Query and mutation resolvers
│   │   ├── store.ts     # In-memory data store
│   │   └── index.ts     # Server entry point
│   └── package.json
├── package.json     # Root package.json (pnpm workspaces)
└── README.md
```

## Prerequisites

- Node.js v24.14.1
- pnpm

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

## Installation & Setup

**1. Clone the repository:**
```bash
git clone git@github.com:dyushchenk0/google-forms-clone.git
cd google-forms-clone
```

**2. Install all dependencies:**
```bash
pnpm install
```

**3. Generate GraphQL types (required before first run):**
```bash
pnpm codegen
```

## Running the Project

**Start both client and server simultaneously:**
```bash
pnpm dev
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:4000        |
| GraphQL Playground | http://localhost:4000 |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — list of all forms |
| `/forms/new` | Form Builder — create a new form |
| `/forms/:id/fill` | Form Filler — fill out a form |
| `/forms/:id/responses` | Form Responses — view submitted responses |

## Features

- Create forms with a title, description, and questions
- 4 question types: Text, One option (radio), Several options (checkbox), Date
- Fill out and submit forms
- View all responses linked to their questions
- Loading and error states on all pages
- Client-side validation (required fields, at least one question, options must have text)

## Notes

- Data is stored **in memory** on the server and will be lost on server restart. This is by design per the project requirements.
- GraphQL types in `client/src/generated/` are auto-generated from the schema. Re-run `pnpm codegen` if the schema changes.
