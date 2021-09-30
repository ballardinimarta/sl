import React from "react";
import { IBus } from "../interfaces/IBus";
interface IMetrosProps {
  departures: IBus[];
}
function Metros(props: IMetrosProps) {
  return (
    <div>
      <p className="title">Tunnelbana</p>
      {props.departures?.length === 0 && <p>Inga tunnelbanor just nu</p>}

      {props.departures?.map((metro) => {
        return (
          <div key={metro.JourneyNumber}>
            {metro.GroupOfLine === "tunnelbanans gröna linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(96, 164, 43)" }}
              >
                {metro.LineNumber}
              </span>
            )}
            {metro.GroupOfLine === "tunnelbanans röda linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(164, 17, 44)" }}
              >
                {metro.LineNumber}
              </span>
            )}
            {metro.GroupOfLine === "tunnelbanans blåa linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(0, 64, 154)" }}
              >
                {metro.LineNumber}
              </span>
            )}

            <span className="destination">{metro.Destination}</span>
            <span className="time">{metro.DisplayTime}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Metros;
