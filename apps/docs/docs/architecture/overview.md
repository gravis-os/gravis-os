# Overview

## Your Application Stack

Depending on the year of production, your product typically ships with the following technologies:

### Language & Frameworks

| Category | Technology |
| -- | --- |
| Language | JavaScript |
| Frontend | ReactJS |
| Backend | NodeJS |
| Platform | Supabase |
| API | REST |
| Database | Postgres |
| Web Server | Vercel |
| Infrastructure | AWS |

### JavaScript Libraries in Detail

| Category |  Library |
| --- | -- |
| UI |  MUI |
| Framework |  NextJS |
| Data Fetcher | React Query |
| Forms |  React Hook Form |
| Monorepo | Turborepo |

### Infrastructure in Detail

|  | Category           |
| --- |--------------------|
| Mail | SendGrid           |
| Functions | Supabase Functions |
| Storage | Supabase Storage   |
| Auth | Supabase Auth      |

## Installing your source code bundle


### Installing your source code

Our apps are built with NextJS. The following steps outline the steps required to run or build a NextJS application. For more details, refer to the NextJS docs.

- To install dependencies: `yarn install`
- To run development server: `yarn dev`
- To run the production server: `yarn build && yarn start`


## Understanding your application code architecture

Our apps are built on top of NextJS, therefore most of the application’s folder structure takes on NextJS’s default paths. The following is an overview of the key folders and their descriptions:

| Name | Description |
| --- | --- |
| `pages` | Routes based on NextJS file-based routing |
| `src/app` | Global app-related configurations |
| `src/modules` | Application-related logic |
