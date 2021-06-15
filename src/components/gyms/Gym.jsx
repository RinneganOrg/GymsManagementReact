import React from "react";
import { useParams } from "react-router-dom";

const Gyms = () => {
  console.log("gym")
  let { gymId } = useParams();

  return (
    <div>
      <h3>You chose {gymId}</h3>
    </div>
  );
}
export default Gyms;