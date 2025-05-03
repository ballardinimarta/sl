import React from "react";
import { Departure } from "./StopButtons";

interface ITramsProps {
  departures: Departure[];
}
function Trams(props: ITramsProps) {
  return (
    <div>
      <p className="title">Tvärbana</p>
      {props.departures?.length === 0 && <p>Inga tvärbanor just nu</p>}
      {props.departures?.map((tram) => {
        return (
          <div key={tram.journey.id}>
            <span
              className="line"
              style={{ backgroundColor: "rgb(164,165,167)" }}
            >
              {tram.line.designation}
            </span>
            <span className="destination">{tram.destination}</span>
            <span className="time">{tram.display}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Trams;
