import React, { useEffect, useState } from "react";
import { fetchFromDb } from "../../../helper/fetch/fetch";

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export default function SimpleRating({ mealId }) {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewers, setReviewers] = useState(0);


  const getRaingStarts = (async () => {
    try {
      const data = await fetchFromDb(`/reviews/${mealId}`, "get")
      if (data.length > 0) {
        const getTotalstars = Number(data[0].total_stars) / Number(data[0].total_reviewers)
        setRatingValue(Math.round(getTotalstars))
        setReviewers(data[0].total_reviewers)

      }
      if (data.length == undefined) {
        setRatingValue(0)
      }
    } catch (err) { throw err }
  })();

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={ratingValue} readOnly />
        <small> ({reviewers})</small>
      </Box>

    </div>
  );
}