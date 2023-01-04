import React, { useEffect, useState } from "react";
import { getMethod } from "../../../helper/fetch/fetchMethods";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function SimpleRating({ mealId }) {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewers, setReviewers] = useState(0);

  const getRaingStarts = (async () => {
    try {
      const { data, error, status } = await getMethod(`/api/reviews/${mealId}`)
      if (data === undefined) {return setRatingValue(0)}
      if (!error) {
        const getTotalstars = Number(data.total_stars) / Number(data.total_reviewers)
        setRatingValue(Math.round(getTotalstars))
        return setReviewers(data.total_reviewers)
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