# MediZen Server

Express + MongoDB Backend API for the Medical Healthcare Website.

## 🚀 Getting Started

### Installation

```bash
cd server
npm install
```

### Environment Setup

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/medizen
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5001
NODE_ENV=development
```

### Seed Database

```bash
npm run seed
```

This will:
- Clear existing data
- Create sample users, services, projects, blogs, doctors, and about content

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## 📁 Directory Structure

```
server/
├── config/        # Configuration files
├── controllers/  # Route controllers
├── middleware/ # Middleware functions
├── models/     # Mongoose models
├── routes/     # API routes
├── scripts/    # Utility scripts
├── utils/      # Utility functions
├── index.js
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Admin (Requires Auth)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/messages` - Get contact messages
- `DELETE /api/admin/messages/:id` - Delete message

### Content
- `GET /api/content/services` - Get all services
- `GET /api/content/services/:id` - Get service by ID
- `POST /api/content/services` - Create service (Admin)
- `PUT /api/content/services/:id` - Update service (Admin)
- `DELETE /api/content/services/:id` - Delete service (Admin)

Similar endpoints for:
- `/api/content/projects`
- `/api/content/blogs`
- `/api/content/doctors`
- `/api/content/about`
- `/api/content/contact`

## 🛠️ Tech Stack

- Node.js
- Express.js 5
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary
- Multer
- bcryptjs
- CORS
- dotenv

## 📄 Default Credentials

After seeding:

**Admin User:**
- Email: admin@example.com
- Password: admin123

**Regular User:**
- Email: user@example.com
- Password: user123

## 📄 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |
