import {
  Paper,
  Typography,
  Box,
  Divider,
} from '@mui/material';

interface ScoreBoardProps {
  leftScore: number;
  rightScore: number;
}

const ScoreBoard = ({ leftScore, rightScore }:ScoreBoardProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'primary.dark' }}>
      <Typography variant="h5" textAlign="center" color="white" gutterBottom>
        Score Board
      </Typography>
      
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Box textAlign="center" flex={1}>
          <Typography variant="h3" fontWeight="bold" color="white">
            {leftScore}
          </Typography>
          <Typography variant="h6" color="grey.300">
            Player 1
          </Typography>
        </Box>
        
        <Divider orientation="vertical" sx={{ height: 60, borderColor: 'grey.400' }} />
        
        <Box textAlign="center" flex={1}>
          <Typography variant="h3" fontWeight="bold" color="white">
            {rightScore}
          </Typography>
          <Typography variant="h6" color="grey.300">
            Player 2
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;
