import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Snackbar from '@mui/material/Snackbar';

export default function RestaurantCard({ restaurant, fetchRestaurants, alreadyVoted }) {  
  const [open, setOpen] = React.useState(false);

  const sendVote = () => {
    fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/vote/${restaurant.id}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      console.log('VOTED: ' + response.status);
      if (response.ok) {
        setOpen(true);
        fetchRestaurants();
      }
      else {
        alert('Something went wrong in voting!');
      }
    })
  }

  return (
    <>
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
        <IconButton 
            size="small"
            color="primary"
            onClick={() => sendVote()}>
              <ThumbUpIcon />
        </IconButton>
      </CardActions>
    </Card>
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      message="Thanks for voting!"
    />
    </>
  );
}