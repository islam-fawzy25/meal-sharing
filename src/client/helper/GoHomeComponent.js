import { useHistory } from "react-router-dom";
import React from "react";

function GoHome() {
  const history = useHistory();

  return (
    <>
      <button type="button" onClick={() => {
        history.push(`/`)
      }}>
        Go home
      </button>
    </>
  );
}
export default GoHome;