# Next.js Full Stack Modern Architecture 🚀

A modern, full-stack web application built with **Next.js 15** and a curated set of technologies to help you quickly build scalable and maintainable applications. This project demonstrates a real-world scaffold with **Server Actions**, **Drizzle ORM**, **PostgreSQL**, and **Cloudinary integration** for image uploads.

---

## 🚀 Key Features

- **Next.js 15 (App Router)** — modern architecture with Server Components and Server Actions.
- **TypeScript** — type-safe development from backend to frontend.
- **Tailwind CSS** — utility-first CSS framework for fast and responsive styling.
- **Drizzle ORM** — type-safe, declarative database queries with PostgreSQL.
- **PostgreSQL** — reliable and powerful relational database.
- **Auth.js** — secure authentication system with Google login support.
- **React Hook Form + Zod** — seamless and type-safe form handling with validation.
- **Cloudinary Integration** — efficient image uploads and hosting.
- **Server & Client Components** — fully aligned with modern Next.js best practices.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **Docker Desktop** (for running the PostgreSQL container)

### Clone the Repository

```bash
git clone https://github.com/BartoszButrymSoftwareMill/next-js-full-stack-modern-architecture
cd next-js-full-stack-modern-architecture
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy the example environment file and fill in your own variables

```bash
cp .env.template .env
```

✍️ Note: You must configure values for PostgreSQL, Auth.js credentials, Cloudinary, and other services as specified in .env.template.

### Start the Database

```bash
docker compose up
```

This will launch a PostgreSQL container with the configuration defined in `docker-compose.yml`.

### Run the Development Server

```bash
npm run dev
```

Visit the app at: http://localhost:3000

## 🗂️ Project Structure

```
📦 src
 ┣ 📂 app               # Next.js App Router (Server & Client Components)
 ┣ 📂 assets            # Static assets (e.g., images)
 ┣ 📂 components        # Reusable UI components
 ┣ 📂 data              # Mock data or seed data
 ┣ 📂 db                # Drizzle ORM configuration, table definitions, and relations
 ┣ 📂 env               # Environment configuration files
 ┣ 📂 lib               # Helper functions (e.g., authentication, Cloudinary)
 ┣ 📂 types             # TypeScript type definitions
 ┣ 📂 validations       # Validation schemas (e.g., Zod)
 ┣ 📄 auth.config.ts    # Auth.js configuration
 ┣ 📄 auth.ts           # Authentication logic
 ┣ 📄 middleware.ts     # Next.js middleware (e.g., auth gate)
📦 public               # Static public files
📄 .env.template        # Example environment variable file
📄 docker-compose.yml   # PostgreSQL container configuration
📄 drizzle.config.ts    # Drizzle ORM configuration
📄 next.config.js       # Next.js configuration
📄 postcss.config.mjs   # PostCSS configuration
📄 tsconfig.json        # TypeScript configuration
📄 README.md            # Project overview and instructions
```