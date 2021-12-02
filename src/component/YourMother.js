import React from "react";
import { useSelector } from "react-redux";

function YourMother({ message }) {
  return (
    <div className="yourMother">
    {
      <h2 id="yourMotherData" style={{ direction: "rtl" }}>
        {message}
      </h2>
    }
  </div>
  );
}

export default YourMother;
