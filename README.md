# Game - Full Stack Application


## 🐳 Running with Docker

### Quick Start (Database Only)

The project includes a Docker Compose configuration that sets up the PostgreSQL database. The backend and frontend run locally for development.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodePepper
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```
   This will start:
   - PostgreSQL database on port `5432`
   - Initialize the database with the schema from `database/init.sql`

3. **Install and run the backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   The backend will be available at `http://localhost:3000`
   GraphQL Playground will be available at `http://localhost:3000/graphql`

4. **Install and run the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Stopping Services

To stop the database:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

## 🏃‍♂️ Development Setup

### Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Make sure the database is running via Docker Compose, then start the backend:
   ```bash
   npm run start:dev
   ```

4. **Available Scripts**
   - `npm run start` - Start the application
   - `npm run start:dev` - Start in development mode with hot reload
   - `npm run start:prod` - Start in production mode
   - `npm run build` - Build the application
   - `npm run test` - Run tests
   - `npm run test:cov` - Run tests with coverage
   - `npm run lint` - Run linter

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Available Scripts**
   - `npm run dev` - Start development server
   - `npm run build` - Build for production
   - `npm run preview` - Preview production build
   - `npm run test` - Run tests
   - `npm run test:ui` - Run tests with UI
   - `npm run test:coverage` - Run tests with coverage
   - `npm run lint` - Run linter

## 🗄️ Database

### Connection Details

When running with Docker Compose:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `game`
- **Username**: `user`
- **Password**: `password`

### Database Schema

The database includes tables for:
- **people** - characters with attributes like name, mass, height, gender
- **starships** - starships with attributes like name, model, crew

### Manual Database Management

To connect to the database directly:
```bash
docker exec -it starwars_postgres_dev psql -U starwars_user -d starwars_game
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test        # Run unit tests
npm run test:cov    # Run tests with coverage
npm run test:e2e    # Run end-to-end tests
```

### Frontend Tests
```bash
cd frontend
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage
npm run test:ui         # Run tests with UI
```
