import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Person as PersonIcon, Rocket as RocketIcon } from '@mui/icons-material';
import type { GameEntity } from '../models/models';
import { isPerson, getComparisonAttribute } from '../utils/gameLogic';

interface GameCardProps {
  entity: GameEntity | null;
  isWinner: boolean;
  category: 'people' | 'starships';
}

const GameCard = ({ entity, isWinner, category }: GameCardProps) => {
  if (!entity) {
    return (
      <Card 
        sx={{ 
          minHeight: 300, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'grey.100'
        }}
      >
        <CardContent>
          <Box textAlign="center">
            {category === 'people' ? <PersonIcon sx={{ fontSize: 48, color: 'grey.400' }} /> : <RocketIcon sx={{ fontSize: 48, color: 'grey.400' }} />}
            <Typography variant="h6" color="text.secondary" mt={2}>
              Ready to play?
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const { label, value } = getComparisonAttribute(entity);
  const cardColor = isWinner ? 'success.light' : 'background.paper';
  const borderColor = isWinner ? 'success.main' : 'divider';

  return (
    <Card 
      sx={{ 
        minHeight: 300,
        backgroundColor: cardColor,
        border: `2px solid`,
        borderColor: borderColor,
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isWinner ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {isWinner && (
        <Chip
          label="WINNER"
          color="success"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: 'bold',
            zIndex: 1,
          }}
        />
      )}
      
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          {isPerson(entity) ? (
            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          ) : (
            <RocketIcon sx={{ mr: 1, color: 'primary.main' }} />
          )}
          <Typography variant="overline" color="text.secondary">
            {isPerson(entity) ? 'Space Hero' : 'Starship'}
          </Typography>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          {entity.name}
        </Typography>

        <Box mt={3}>
          <Typography variant="h6" color="primary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h3" component="div" fontWeight="bold" color={isWinner ? 'success.dark' : 'text.primary'}>
            {value}
          </Typography>
        </Box>

        {isPerson(entity) && (
          <Box mt={3} display="flex" flexDirection="column" gap={1}>
            {entity.height && (
              <Typography variant="body2" color="text.secondary">
                Height: {entity.height} cm
              </Typography>
            )}
            {entity.gender && (
              <Typography variant="body2" color="text.secondary">
                Gender: {entity.gender}
              </Typography>
            )}
          </Box>
        )}

        {!isPerson(entity) && (
          <Box mt={3} display="flex" flexDirection="column" gap={1}>
            {entity.model && (
              <Typography variant="body2" color="text.secondary">
                Model: {entity.model}
              </Typography>
            )}
            {entity.starshipClass && (
              <Typography variant="body2" color="text.secondary">
                Class: {entity.starshipClass}
              </Typography>
            )}
        
              <Typography variant="body2" color="text.secondary">
                Passengers: {entity.passengers}
              </Typography>
        
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default GameCard;
