<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Next.js 14 Admin Dashboard for Restaurant Management</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://pizzalander.netlify.app">View Landing Page</a>
  <br>
<a href="https://pizzalander.netlify.app/signin">View Dashboard</a><br>
<span>
  login with <br>
  admin@example.com <br>
  admin123
<span>
</div>

## Overview

This admin dashboard is designed for restaurant and organization management, featuring robust functionality and seamless integration with a backend API.

### Tech Stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- API Communication - [REST](https://restfulapi.net/)
- Auth - [JWT Authentication](https://jwt.io/)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)

_This project was initially forked from [Kiranism's Next.js dashboard starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)._

## Features

- **Reservation Management**: Real-time updates and CRUD operations for reservations using Socket.IO.
- **Reservation Clients**: Reservation availability dynamically generated based on Organization open close hours.
- **User & Organization Management**: Role-based access control with admin and user roles.
- **Authentication**: Secure JWT-based authentication with support for organization-based access.
- **Analytics Dashboard**: Interactive charts and analytics for restaurant performance.
- **Kanban Board**: Task management with drag-and-drop functionality.
- **Dynamic Forms**: Multi-step forms for organization setup and profile management.
- **Robust API Integration**: All endpoints dynamically handled via the backend.
- **Organization API Keys**: Publicly acessible routes with api key validation for client sites

## Pages

| Pages                                  | Features                                                                                   |
| :------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Signin**                             | Login functionality with secure token handling.                                            |
| **Dashboard**                          | Overview of key analytics and links to other management features.                         |
| **Reservations**                       | View and manage reservations in real-time with socket updates.                            |
| **Reservations Archive**               | Manage archived reservations.                                                             |
| **New Reservation**                    | Add a new reservation with form validation using React Hook Form.                         |
| **Users**                              | Manage users in the organization with roles and permissions.                              |
| **Profile**                            | Multi-step profile form using dynamic components for form validation and updates.          |
| **Not Found**                          | Custom 404 page for undefined routes.                                                     |

## Getting Started

Follow these steps to clone the repository and start the development server:

1. Clone the repository:
- `git clone https://github.com/jrvscm/restaurant-saas.git`
- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000.

