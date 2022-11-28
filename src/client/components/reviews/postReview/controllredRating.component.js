import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating({setReviewStars,reviewStars}) {

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Typography component="legend">Controlled</Typography> */}
        <Rating
          name="simple-controlled"
          value={reviewStars}
          onChange={(event, newValue) => {
            setReviewStars(newValue);
          }}
        />
      </Box>
    
    </div>
  );
}