import { useHistory } from "react-router-dom";
import React from "react";
import "./GenericButton.style.css"

function GenaricButton({title,handleOnClick}) {
  return (
    <>
      <button className="generic-button" type="button" onClick={() => {
        handleOnClick()
      }}>
       {title}
      </button>
    </>
  );
}
export default GenaricButton;