import { useHistory } from "react-router-dom";
import React from "react";

function GenaricButton({title,handleOnClick}) {
  return (
    <>
      <button type="button" onClick={() => {
        handleOnClick()
      }}>
       {title}
      </button>
    </>
  );
}
export default GenaricButton;