import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GameCard from '../components/GameCard';
import type { Person, Starship } from '../models/models';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('GameCard Component', () => {
  const mockPerson: Person = {
    id: '1',
    name: 'Alex Nova',
    mass: 77,
    height: 172,
    gender: 'male',
  };

  const mockStarship: Starship = {
    id: '1',
    name: 'Eagle Strike',
    crew: 1,
    model: 'T-65 X-wing',
    starshipClass: 'Starfighter',
  };

  it('renders empty card when no entity provided', () => {
    renderWithTheme(
      <GameCard entity={null} isWinner={false} category="people" />
    );
    
    expect(screen.getByText('Ready to play?')).toBeInTheDocument();
  });

  it('renders person card correctly', () => {
    renderWithTheme(
      <GameCard entity={mockPerson} isWinner={false} category="people" />
    );
    
    expect(screen.getByText('Alex Nova')).toBeInTheDocument();
    expect(screen.getByText('Mass (kg)')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('Space Hero')).toBeInTheDocument();
  });

  it('renders starship card correctly', () => {
    renderWithTheme(
      <GameCard entity={mockStarship} isWinner={false} category="starships" />
    );
    
    expect(screen.getByText('Eagle Strike')).toBeInTheDocument();
    expect(screen.getByText('Crew Size')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Starship')).toBeInTheDocument();
  });

  it('shows winner badge when isWinner is true', () => {
    renderWithTheme(
      <GameCard entity={mockPerson} isWinner={true} category="people" />
    );
    
    expect(screen.getByText('WINNER')).toBeInTheDocument();
  });

  it('does not show winner badge when isWinner is false', () => {
    renderWithTheme(
      <GameCard entity={mockPerson} isWinner={false} category="people" />
    );
    
    expect(screen.queryByText('WINNER')).not.toBeInTheDocument();
  });
});
