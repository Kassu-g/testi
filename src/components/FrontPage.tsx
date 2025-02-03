import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

export interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

interface FrontPageProps {
  saveJoke?: (joke: IJoke) => boolean;
}

const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
  const [joke, setJoke] = useState<IJoke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJoke = () => {
    const controller = new AbortController();
    setLoading(true);
    fetch('https://official-joke-api.appspot.com/random_joke', {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: IJoke) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching joke:', error);
        }
        setLoading(false);
      });
    return controller;
  };

  useEffect(() => {
    const controller = fetchJoke();
    return () => {
      controller.abort();
    };
  }, []);

  const handleGetNewJoke = () => {
    fetchJoke();
  };

  return (
    <div style={{ padding: '16px' }}>
      <Button variant="contained" color="primary" onClick={handleGetNewJoke}>
        Get a new joke
      </Button>

      {loading && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading a joke...
        </Typography>
      )}

      {joke && !loading && (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {joke.setup}
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: 1 }}>
              {joke.punchline}
            </Typography>
            {saveJoke && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 2 }}
                onClick={() => saveJoke(joke)}
              >
                Save Joke
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FrontPage;
