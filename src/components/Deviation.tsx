import React from "react";
import { Deviation as DeviationType } from "./StopButtons";

const Deviation = (props: DeviationType) => {
  return (
    <div className="deviation">
      <span>i</span>
      <p>{props.message}</p>
    </div>
  );
};

export default Deviation;
