# App Frontend

This is the **frontend** for a Task Tracker application built with **SvelteKit**. It provides a responsive interface for users to **sign up, log in, and manage tasks**.  

---

## Project Structure

```

frontend/
├── src/
│   ├── lib/             # Shared components and utilities
│   └── routes/
│       ├── login/       # Login page
│       │   └── +page.svelte
│       ├── signup/      # Signup page
│       │   └── +page.svelte
│       └── tasks/       # Task management pages
│           ├── +layout.svelte
│           ├── +page.svelte
│           └── +page.svelte
├── static/              # Static assets (images, icons, etc.)
├── app.css              # Global CSS
├── app.html             # Main HTML template
├── svelte.config.js     # SvelteKit configuration
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── .eslintrc.js         # ESLint configuration

````

---

## Features

- User authentication (**login/signup**)
- Task CRUD operations (Create, Read, Update, Delete)
- Responsive layout for desktop and mobile
- Organized SvelteKit routing for modularity
- Easy integration with a backend API

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd frontend
````

2. Install dependencies:

```bash
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

---

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `.svelte-kit` folder.

---

## Scripts

* `npm run dev` – Run in development mode
* `npm run build` – Build for production
* `npm run preview` – Preview the production build
* `npm run lint` – Run ESLint checks

---

## Notes

* Make sure the backend API is running and CORS is configured to allow requests from the frontend.
* CSS can be customized in `app.css`.
* Components can be placed inside `src/lib` for reuse across routes.

---
