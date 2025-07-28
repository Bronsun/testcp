# Galactic Battle - Frontend

A React + TypeScript frontend for the Galactic Battle game where players compare space heroes and starships.

## Tech Stack

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - UI component library
- **Apollo Client** - GraphQL client
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities

## Features

- 🎮 Interactive card-based comparison game
- ⭐ Space heroes vs heroes (mass comparison)
- 🚀 Starships vs starships (crew size comparison)
- 🏆 Score tracking for Player 1 vs Player 2
- 🎨 Modern UI with Material-UI components
- 📱 Responsive design
- ✅ Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint the codebase

## Game Rules

1. **Character Battles**: When two space heroes are compared, the one with higher mass (weight) wins
2. **Starship Battles**: When two starships are compared, the one with larger crew size wins
3. **Categories**: Each round randomly selects either characters or starships
4. **Scoring**: Player 1 (left card) and Player 2 (right card) scores are tracked across rounds
5. **Ties**: When values are equal, it's declared a tie (no points awarded)

## Project Structure

```
src/
├── components/          # React components
│   ├── Game.tsx        # Main game component
│   ├── GameCard.tsx    # Individual card component
│   ├── ScoreBoard.tsx  # Score display component
│   └── index.ts        # Component exports
├── graphql/            # GraphQL related files
│   ├── client.ts       # Apollo Client configuration
│   └── queries.ts      # GraphQL queries and mutations
├── types/              # TypeScript type definitions
│   └── index.ts        # Game types and interfaces
├── utils/              # Utility functions
│   └── gameLogic.ts    # Game logic and comparison functions
├── __tests__/          # Test files
│   ├── gameLogic.test.ts
│   └── GameCard.test.tsx
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## GraphQL Integration

The frontend connects to a GraphQL backend server (expected at `http://localhost:4000/graphql`) with the following queries:

- `randomPerson` - Get a random space hero
- `randomStarship` - Get a random starship
- `people` - Get all characters
- `starships` - Get all starships

The app also supports full CRUD operations through GraphQL mutations.

## Testing

The project includes comprehensive tests covering:

- **Unit Tests**: Game logic functions (winner determination, type checking, etc.)
- **Component Tests**: React component rendering and behavior
- **Integration Tests**: Component interaction with props and state

Run tests with:
```bash
npm run test
```

## Backend Requirements

This frontend requires a GraphQL backend server that provides:

- Space hero data with `name`, `mass`, `height`, etc.
- Starship data with `name`, `crew`, `model`, etc.
- Random selection queries for both characters and starships
- CRUD mutations for managing data

## Development

### Adding New Features

1. **New Components**: Add to `src/components/` and export in `index.ts`
2. **GraphQL Queries**: Add to `src/graphql/queries.ts`
3. **Types**: Update `src/types/index.ts`
4. **Tests**: Add corresponding test files in `src/__tests__/`

### Styling

The app uses MUI's theming system with a custom theme defined in `App.tsx`. Component styling uses the `sx` prop for consistency.

### State Management

The app uses React's built-in `useState` for state management. The main game state includes:

- Current cards (left/right)
- Winner determination
- Score tracking
- Category selection
- Loading/error states

No external state management library is needed for this application's complexity level.

## License

This project is for educational/demonstration purposes.
```
