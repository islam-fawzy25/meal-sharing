import React, { useEffect, useState } from "react";
import {fetchFromDb}  from "../../../helper/fetch/fetch";

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export default function SimpleRating({mealId}) {
    const [ratingValue, setRatingValue] = useState(0);


    const getRaingStarts = (async () => {
        try {
            const data = await fetchFromDb(`/reviews/${mealId}`, "get")
            if(data.length > 0 ){
                setRatingValue(Number(data[0].total_stars))

            }
            if(data.length == undefined){
                setRatingValue(0)
            }

        } catch (err) { throw err }
    })();

    return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Typography component="legend">Read only</Typography> */}
        <Rating name="read-only" value={ratingValue} readOnly />
      </Box>

    </div>
  );
}