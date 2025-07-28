import  { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_PERSON, GET_RANDOM_STARSHIP } from '../graphql/queries';
import type { GameState } from '../models/models';
import { determineWinner } from '../utils/gameLogic';
import GameCard from './GameCard';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    leftCard: null,
    rightCard: null,
    winner: null,
    category: 'people',
    leftScore: 0,
    rightScore: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<'people' | 'starships'>('people');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const { refetch: refetchPerson } = useQuery(GET_RANDOM_PERSON, {
    skip: true,
    fetchPolicy: 'no-cache', 
  });

  const { refetch: refetchStarship } = useQuery(GET_RANDOM_STARSHIP, {
    skip: true,
    fetchPolicy: 'no-cache', 
  });

  const fetchRandomPair = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const category = selectedCategory;
      
      if (category === 'people') {
        const leftResult = await refetchPerson();
        
        await new Promise(resolve => setTimeout(resolve, 50));
        const rightResult = await refetchPerson();
        
        if (leftResult.data?.randomPerson && rightResult.data?.randomPerson) {
          const leftCard = leftResult.data.randomPerson;
          let rightCard = rightResult.data.randomPerson;
          
          if (leftCard.id === rightCard.id) {
            let retryCount = 0;
            let newRightResult = rightResult;
            while (newRightResult.data?.randomPerson?.id === leftCard.id && retryCount < 5) {
              await new Promise(resolve => setTimeout(resolve, 100));
              newRightResult = await refetchPerson();
              retryCount++;
            }
            if (newRightResult.data?.randomPerson) {
              rightCard = newRightResult.data.randomPerson;
            }
          }
          
          const winner = determineWinner(leftCard, rightCard);
          
          setGameState(prev => ({
            ...prev,
            leftCard,
            rightCard,
            winner,
            category,
            leftScore: prev.leftScore + (winner === 'left' ? 1 : 0),
            rightScore: prev.rightScore + (winner === 'right' ? 1 : 0),
          }));
        }
      } else {
        const leftResult = await refetchStarship();
        
        await new Promise(resolve => setTimeout(resolve, 50));
        const rightResult = await refetchStarship();
        
        if (leftResult.data?.randomStarship && rightResult.data?.randomStarship) {
          let leftCard = leftResult.data.randomStarship;
          let rightCard = rightResult.data.randomStarship;
          
          // If we get the same starship, retry the right card
          if (leftCard.id === rightCard.id) {
            let retryCount = 0;
            let newRightResult = rightResult;
            while (newRightResult.data?.randomStarship?.id === leftCard.id && retryCount < 5) {
              await new Promise(resolve => setTimeout(resolve, 100));
              newRightResult = await refetchStarship();
              retryCount++;
            }
            if (newRightResult.data?.randomStarship) {
              rightCard = newRightResult.data.randomStarship;
            }
          }
          
          const winner = determineWinner(leftCard, rightCard);
          
          setGameState(prev => ({
            ...prev,
            leftCard,
            rightCard,
            winner,
            category,
            leftScore: prev.leftScore + (winner === 'left' ? 1 : 0),
            rightScore: prev.rightScore + (winner === 'right' ? 1 : 0),
          }));
        }
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching random pair:', err);
    } finally {
      setIsLoading(false);
    }
  }, [refetchPerson, refetchStarship, selectedCategory]);

  const resetGame = () => {
    setGameState({
      leftCard: null,
      rightCard: null,
      winner: null,
      category: selectedCategory,
      leftScore: 0,
      rightScore: 0,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Galactic Battle
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Compare space heroes and starships!
        </Typography>
      </Box>

      <ScoreBoard 
        leftScore={gameState.leftScore} 
        rightScore={gameState.rightScore} 
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" gap={3} justifyContent="center" sx={{ mb: 4 }} flexWrap="wrap">
        <Box flex="1" maxWidth="400px">
          <GameCard
            entity={gameState.leftCard}
            isWinner={gameState.winner === 'left'}
            category={gameState.category}
          />
        </Box>
        
        <Box display="flex" alignItems="center" justifyContent="center" minWidth="200px">
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', minHeight: 120 }}>
            {gameState.winner && !isLoading && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {gameState.winner === 'tie' ? 'It\'s a Tie!' : 'Winner!'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {gameState.category === 'people' ? 'Higher Mass' : 'Larger Crew'}
                </Typography>
              </Box>
            )}
            {isLoading && (
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <CircularProgress />
                <Typography variant="body2">Loading...</Typography>
              </Box>
            )}
          </Paper>
        </Box>
        
        <Box flex="1" maxWidth="400px">
          <GameCard
            entity={gameState.rightCard}
            isWinner={gameState.winner === 'right'}
            category={gameState.category}
          />
        </Box>
      </Box>

      <Box textAlign="center" display="flex" gap={2} justifyContent="center" alignItems="center" flexWrap="wrap" sx={{ mb: 3 }}>
        <FormControl variant="outlined" size="medium" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value as 'people' | 'starships')}
            disabled={isLoading}
          >
            <MenuItem value="people">Characters</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box textAlign="center" display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          size="large"
          onClick={fetchRandomPair}
          disabled={isLoading}
          sx={{ px: 4, py: 2 }}
        >
          {gameState.leftCard ? 'Play Again' : 'Start Game'}
        </Button>
        
        {gameState.leftCard && (
          <Button
            variant="outlined"
            size="large"
            onClick={resetGame}
            disabled={isLoading}
            sx={{ px: 4, py: 2 }}
          >
            Reset Scores
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Game;
