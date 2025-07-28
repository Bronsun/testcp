# Game - Full Stack Application

A full-stack game application built with NestJS (backend), React with TypeScript (frontend), and PostgreSQL (database). The application uses GraphQL for API communication and Docker for containerization.

## 🏗️ Project Structure

```
CodePepper/
├── backend/                 # NestJS GraphQL API server
│   ├── src/                # Source code
│   │   ├── people/         # People module (characters)
│   │   ├── starships/      # Starships module
│   │   └── common/         # Shared utilities
│   └── test/               # Test files
├── frontend/               # React TypeScript application
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── graphql/        # GraphQL queries and client
│   │   └── utils/          # Utility functions
│   └── __tests__/          # Test files
├── database/               # Database initialization
│   └── init.sql           # Database schema and seed data
└── docker-compose.yml      # Docker services configuration
```

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - API query language with Apollo Server
- **TypeORM** - Database ORM
- **PostgreSQL** - Database
- **Jest** - Testing framework

### Frontend
- **React 19** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **Apollo Client** - GraphQL client
- **Vitest** - Testing framework

### Database
- **PostgreSQL 15** - Primary database
- **Docker** - Containerization

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) (version 20.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

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

## 🔧 Configuration

### Backend Configuration

The backend uses environment variables for configuration. Key configurations include:
- Database connection settings (automatically configured for Docker setup)
- GraphQL schema auto-generation
- CORS settings for frontend communication

### Frontend Configuration

The frontend is configured to connect to:
- Backend GraphQL endpoint: `http://localhost:3000/graphql`
- Development server runs on port `5173`

## 📊 GraphQL API

The backend provides a GraphQL API with the following main queries and mutations:

### Queries
- `people(pagination)` - Get paginated list of people
- `starships(pagination)` - Get paginated list of starships

### Example Query
```graphql
query {
  people(pagination: { limit: 10, offset: 0 }) {
    items {
      id
      name
      mass
      height
      gender
    }
    total
    hasMore
  }
}
```

Access the GraphQL Playground at `http://localhost:3000/graphql` when the backend is running.

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   - Make sure ports 3000 (backend), 5173 (frontend), and 5432 (database) are available
   - Stop other services using these ports or modify the configuration

2. **Database connection issues**
   - Ensure Docker is running
   - Verify the database container is up: `docker-compose ps`
   - Check database logs: `docker-compose logs postgres`

3. **Node modules issues**
   - Delete `node_modules` and `package-lock.json`, then run `npm install`
   - Ensure you're using Node.js version 18 or higher

4. **GraphQL connection issues**
   - Verify the backend is running on port 3000
   - Check that the GraphQL endpoint is accessible at `http://localhost:3000/graphql`

### Logs

View application logs:
```bash
# Database logs
docker-compose logs postgres

# Backend logs (when running with npm run start:dev)
# Logs will appear in the terminal where you started the backend

# Frontend logs (when running with npm run dev)
# Logs will appear in the terminal where you started the frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Look at existing issues in the repository
3. Create a new issue with detailed information about your problem

---

**Happy coding! May the Force be with you! 🌟**
