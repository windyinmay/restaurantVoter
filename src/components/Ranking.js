import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

export default function Ranking({ topRestaurants }) {
  return(
    <>
      <Card outlined sx={{width: 500, height: 110, padding: 1}}>
      <Stack>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          TOP 3
        </Typography>
        <Typography sx={{ fontSize: 16 }}>
            {topRestaurants.length > 0 && topRestaurants[0].votes > 0 ? `1.) ${topRestaurants[0].name} (${topRestaurants[0].votes} votes)` : '1.) -'}
        </Typography>      
        <Typography sx={{ fontSize: 16 }}>
            {topRestaurants.length > 1 && topRestaurants[1].votes > 0 ? `2.) ${topRestaurants[1].name} (${topRestaurants[1].votes} votes)` : '2.) -'}
        </Typography>      
        <Typography sx={{ fontSize: 16 }}>
            {topRestaurants.length > 3 && topRestaurants[2].votes > 0 ? `3.) ${topRestaurants[2].name} (${topRestaurants[2].votes} votes)` : '3.) -'}
        </Typography>
      </Stack>
      </Card>      
    </>
  );
}