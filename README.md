# Loggeteller

A Next.js application for tracking geocaching logs and calculating points.

## Features

- Add and manage geocaching caches
- Record logs for caches
- Calculate points based on log timing
- Random winner selection
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- MySQL 8.x or later

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd loggeteller
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your database connection:
```
DATABASE_URL="mysql://user:password@localhost:3306/loggeteller"
```

4. Create the database:
```bash
mysql -u root -p
CREATE DATABASE loggeteller;
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

The application uses Prisma with MySQL. The schema includes:

- Cache: Stores geocaching cache information
- Log: Stores log entries for caches

## Technologies Used

- Next.js 14
- React 18
- Prisma
- MySQL
- Tailwind CSS
- TypeScript
