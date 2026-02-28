# Movie App Backend API
Node.js + TypeScript + Express + Prisma + PostgreSQL.

## Tech Stack
- **Runtime**: Node.js 20+
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Containerization**: Docker Compose

## Prerequisites
- [Node.js](https://nodejs.org/) (20+)
- [Docker](https://docker.com/) + Docker Compose


## Quick Start

### 1.  Clone the repository and install dependencies
```bash
git clone <repo-url>
cd project
npm install  
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

### 3.Start infrastructure (Docker)
```bash
docker-compose up -d 
```

### 4. Run database migrations
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the development server
```bash
npm run dev  
