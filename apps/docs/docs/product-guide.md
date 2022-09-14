# Product Guide

Thank you for your supporting One X Group. We are pleased to have been able to part of your digital journey. This handover documentation aims to guide you through a smooth transition into the next chapter of your product roadmap.

## Handover Overview

### Handover Checklist

As part of the standard handover process, you should receive the following items:

- [ ]  Source Code Bundle x 1
- [ ]  Database Dump(s) x 1
- [ ]  Static File Assets x 1

## Your Application Stack

Depending on the year of production, your product typically ships with the following technologies:

### Language & Frameworks

|  | Before 2022 | 2022 and Beyond |
| --- | --- | --- |
| Language | JavaScript | JavaScript |
| Frontend | ReactJS | ReactJS |
| Backend | NodeJS | NodeJS |
| Platform | Amplify | Supabase |
| API | GraphQL | REST |
| Database | DynamoDB | Postgres |
| Web Server | Vercel | Vercel |
| Infrastructure | AWS | AWS |

### JavaScript Libraries in Detail

|  | Before 2022 | 2022 and Beyond |
| --- | --- | --- |
| UI | Material UI | MUI |
| Framework | NextJS | NextJS |
| Data Fetcher | React Apollo | React Query |
| Forms | React Hook Form | React Hook Form |
| Monorepo | Yarn Workspaces | Turborepo |

### Infrastructure in Detail

|  | Before 2022 | 2022 and Beyond |
| --- | --- | --- |
| Mail | AWS SES | SendGrid |
| Functions | AWS Lambda | Supabase Functions |
| Storage | AWS S3 | Supabase Storage |
| Auth | AWS Cognito | Supabase Auth |

## Installing your source code bundle

### Setting up your local machine for success

Kindly ensure that you have the following environment dependency versions in your machine:

- Latest NodeJS LTS
- Latest stable NPM version

### Setting up your Git repository

We recommend registering an account with a Git provider such as Github or Bitbucket to host your source code for your team.

### Installing your source code

Our apps are built with NextJS. The following steps outline the steps required to run or build a NextJS application. For more details, refer to the NextJS docs.

- To install dependencies: `yarn install`
- To run development server: `yarn dev`
- To run the production server: `yarn build && yarn start`

<aside>
💡 Use the correct dependency manager when installing your dependencies to ensure your build works as intended. As a rule of thumb, in JavaScript apps, if you see a `yarn.lock` file, use `yarn install`; if you see a `package-lock.json` file, use `npm install`.

</aside>

### Getting to a passing build

Before handover, we verify that the source code provided to you generates a passing build. If you’re unable to get to a successful build, kindly ensure that you’re using the correct dependency manager and installing the dependency versions listed in your package.json file.

Avoid making major upgrades to your app’s dependencies e.g. React 17 → 18 as this will most likely cause your build to fail. The dependency lock files are meant to ensure that your versions stay locked, so use it well.

## Understanding your application code architecture

Our apps are built on top of NextJS, therefore most of the application’s folder structure takes on NextJS’s default paths. The following is an overview of the key folders and their descriptions:

| Name | Description |
| --- | --- |
| pages | Routes based on NextJS file-based routing |
| src/app | Global app-related configurations |
| src/modules | Application-related logic |

## Server Migration

### Platform Infrastructure Migration

The documents provided in the handover bundle contains the necessary materials for you to host your code in a new server environment.

<aside>
💡 For production builds before 2022, you may find information on hosting your production server using AWS Amplify Migration as mentioned in the official AWS docs.

</aside>

### Web Server Migration

We use Amazon Web Services directly for the majority of our cloud infrastructure with the exception of our web servers. For web servers, we use Vercel instead of EC2. Vercel is a web hosting provider that streamlines your application deployment. Vercel uses AWS as its underlying infrastructure.

To initiate your web server migration. Kindly register a Vercel account at [Vercel.com](http://Vercel.com) and request for a project transfer from One X Group Support. Upon authorisation of transfer, you will receive your application project in your Vercel account with zero downtime.

## Data migration

You can find your database dump in your handover package. After you’ve setup your database tables in your new cloud infrastructure, use the database dumps to import your data into your new database.

## Migration Checklist

The following is a list of resources that you may need to consider during your migration process

- [ ]  Vercel
- [ ]  Email Provider (e.g. Amazon SES)
- [ ]  User Identity Pool (e.g. AWS Cognito)