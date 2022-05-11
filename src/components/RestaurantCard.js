import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

export default function RestaurantCard({ restaurant, fetchRestaurants }) {  
  const sendVote = () => {
    fetch(`http://localhost:8080/api/v1/vote/${restaurant.id}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      console.log('VOTED: ' + response.status);
      if (response.ok) {
        fetchRestaurants();
      }
      else {
        alert('Something went wrong in voting!');
      }
    })
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 150 }}>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography variant="h7" gutterBottom>
            {restaurant.name}
          </Typography>
          </Stack>
        <Typography variant="body2">
          Open: {restaurant.openingHours}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">
            Votes: {restaurant.votes}
          </Typography>
          <Typography variant="body2">
            Dishes: {restaurant.dishes.length}
          </Typography>
        </Stack>   
      </CardContent>
      <CardActions>
        <Button 
            variant="outlined"
            size="small"
            onClick={() => sendVote()}>
            Vote
        </Button>    
      </CardActions>
    </Card>
  );
}