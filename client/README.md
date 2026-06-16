# MediZen Client

React + TypeScript + Vite Frontend for the Medical Healthcare Website.

## 🚀 Getting Started

### Installation

```bash
cd client
npm install
```

### Environment Setup

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Directory Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── api/           # API configuration
│   ├── assets/        # Images and assets
│   ├── components/  # Reusable components
│   ├── features/    # Feature modules
│   │   ├── about/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── blogs/
│   │   ├── contact/
│   │   ├── doctors/
│   │   ├── projects/
│   │   └── services/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
└── package.json
```

## 🎨 Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack)
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Axios
- React Hot Toast

## 📄 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
