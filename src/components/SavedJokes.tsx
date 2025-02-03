import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { IJoke } from './FrontPage';

interface SavedJokesProps {
  jokes: IJoke[];
}

const SavedJokes: React.FC<SavedJokesProps> = ({ jokes }) => {
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Saved Jokes
      </Typography>
      <Grid container spacing={2}>
        {jokes.map((joke) => (
          <Grid item xs={12} md={6} key={joke.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{joke.setup}</Typography>
                <Typography color="text.secondary">{joke.punchline}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SavedJokes;
