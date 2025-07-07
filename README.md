# Interactive Gallery App

A full-stack web application showcasing beautiful images from Unsplash, with features like commenting and liking images. Users can browse, comment anonymously, and like images seamlessly.

---

## Features

- Browse stunning images fetched from the Unsplash API.
- View images in grid or list layouts.
- Anonymous commenting on images.
- Like images anonymously or as authenticated users.
- Pagination support to browse through pages of images.
- Responsive design supporting dark and light themes.
- User authentication (login/register) for enhanced features (optional).

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **API:** Unsplash API for images
- **Deployment:** *(Add your deployment URLs here)*

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL (local or remote)
- Unsplash API Access Key ([create here](https://unsplash.com/developers))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/interactive-gallery-app.git
   cd interactive-gallery-app



Interactive Gallery App
A full-stack web application showcasing beautiful images from Unsplash, with features like commenting and liking images. Users can browse, comment anonymously, and like images seamlessly.

Features
Browse stunning images fetched from the Unsplash API.

View images in grid or list layouts.

Anonymous commenting on images.

Like images without authentication (or authenticated users).

Pagination support to browse through pages of images.

Responsive design supporting dark and light themes.

User authentication (login/register) for enhanced features (optional).

Tech Stack
Frontend: React, TypeScript, Tailwind CSS, React Router

Backend: Node.js, Express, Prisma ORM, PostgreSQL

Authentication: JWT (JSON Web Tokens)

API: Unsplash API for images

Deployment: (Add your deployment platform URLs here)

Getting Started
Prerequisites
Node.js (v16+)

npm or yarn

PostgreSQL (local or remote)

Unsplash API Access Key (create at https://unsplash.com/developers)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/interactive-gallery-app.git
cd interactive-gallery-app
Setup backend:

bash
Copy
Edit
cd backend
npm install
Setup frontend:

bash
Copy
Edit
cd ../front
npm install
Create a .env file in the backend folder and add:

ini
Copy
Edit
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
Create a .env file in the frontend folder and add:

ini
Copy
Edit
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
Database Setup
Run Prisma migrations to set up your database schema:

bash
Copy
Edit
cd backend
npx prisma migrate dev --name init
Running the App Locally
Start the backend server:

bash
Copy
Edit
cd backend
npm run dev
Start the frontend development server:

bash
Copy
Edit
cd front
npm run dev
Open http://localhost:3000 to view the app in the browser.

Usage
Browse images on the homepage.

Click on any image to view details and comments.

Add comments anonymously.

Like images (if logged in or anonymously based on backend setup).
