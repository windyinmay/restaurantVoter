import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Ranking from './Ranking';
import Stack from '@mui/material/Stack';
import RestaurantCard from './RestaurantCard';
import _ from 'lodash';

export default function RestaurantList() {
  const [city, setCity] = useState('Helsinki');
  const [todaysVotes, setTodaysVotes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState('');
  const cityOptions = ["Helsinki", "Espoo", "Vantaa", "Jyväskylä", "Kuopio", "Oulu", "Tampere", "Kempele", "Turku"];

  useEffect(() => {
    fetchRestaurants();
    fetchResults();
  }, [city]);

  const fetchRestaurants = () => {
    fetch(`http://localhost:8080/api/v1/restaurants/${city}`)
    .then(res => res.json())
    .then(data => {
      setRestaurants(data.restaurants);
      setAlreadyVoted(data.alreadyVoted);
      console.log(data);
    })
    .then(_ => fetchResults())
    .catch(err => console.error(err))
  }

  const fetchResults = () => {
    fetch("http://localhost:8080/api/v1/results")
    .then(res => res.json())
    .then(data => {
      setTodaysVotes(_.orderBy(data.results, ['votes'], ['desc']));
    })
    .catch(err => console.error(err))
      
  }

  return(
    <>  
    <Stack direction="row" spacing={1} alignItems='center'>
      <Autocomplete
          disablePortal
          id="cities"
          options={cityOptions}
          value={city}
          onChange={(e, selectedCity) => setCity(selectedCity)}
          sx={{ width: 300, margin: 5 }}
          renderInput={(params) => <TextField {...params} label="Choose a city" />}
        />  
        <Ranking topRestaurants={todaysVotes} />
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {
            restaurants.map(restaurant => 
              <>
                <Grid item xs={3}>
                  <RestaurantCard 
                    restaurant={restaurant} 
                    fetchRestaurants={fetchRestaurants} 
                    alreadyVoted={alreadyVoted}
                  />
                </Grid>
              </>
              )
          }
        </Grid>
      </Box>
    </>
  );
}