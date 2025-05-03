import React from "react";
import { Departure } from "./StopButtons";

interface IMetrosProps {
  departures: Departure[];
}

function Metros(props: IMetrosProps) {
  return (
    <div>
      <p className="title">Tunnelbana</p>
      {props.departures?.length === 0 && <p>Inga tunnelbanor just nu</p>}

      {props.departures?.map((metro) => {
        return (
          <div key={metro.journey.id}>
            {metro.line.group_of_lines === "Tunnelbanans gröna linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(96, 164, 43)" }}
              >
                {metro.line.designation}
              </span>
            )}
            {metro.line.group_of_lines === "Tunnelbanans röda linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(164, 17, 44)" }}
              >
                {metro.line.designation}
              </span>
            )}
            {metro.line.group_of_lines === "Tunnelbanans blåa linje" && (
              <span
                className="line"
                style={{ backgroundColor: "rgb(0, 64, 154)" }}
              >
                {metro.line.designation}
              </span>
            )}

            <span className="destination">{metro.destination}</span>
            <span className="time">{metro.display}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Metros;
