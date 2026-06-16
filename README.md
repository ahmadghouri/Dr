# MediZen - Medical Healthcare Website

A full-stack medical healthcare website built with React + TypeScript + Vite (Frontend) and Express + MongoDB (Backend).

## 📁 Project Structure

```
Dr/
├── client/       # React + TypeScript + Vite Frontend
├── server/       # Express + MongoDB Backend
└── README.md     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

#### 1. Clone the repository

```bash
cd c:\Users\GLB\Desktop\Dr
```

#### 2. Set up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5001
NODE_ENV=development
```

Seed the database with sample data:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

Server will run on `http://localhost:5001`

#### 3. Set up the Client

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory with:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the development server:

```bash
npm run dev
```

Client will run on `http://localhost:5173`

## 🎯 Features

- **User Authentication**: Login and Registration
- **Admin Dashboard**: Manage content (Services, Doctors, Blogs, Projects, About, etc.)
- **Responsive Design**: Mobile-friendly interface
- **Image Upload**: Cloudinary integration
- **Contact Form**: Send messages
- **Blog System**: Read and manage blog posts
- **Doctor Profiles**: View doctor information
- **Services**: Browse available services
- **Projects**: Showcase medical projects

## 🔧 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- React Query (TanStack)
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary
- Multer
- bcryptjs

## 📝 Default Admin Credentials

After seeding the database, you can use:

- **Email**: admin@example.com
- **Password**: admin123

## 📚 More Info

For more detailed information, check the README files in each directory:

- [Client README](./client/README.md)
- [Server README](./server/README.md)
