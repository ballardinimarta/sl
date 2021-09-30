import React from "react";
import { IBus } from "../interfaces/IBus";
interface ITramsProps {
  departures: IBus[];
}
function Trams(props: ITramsProps) {
  return (
    <div>
      <p className="title">Tvärbana</p>
      {props.departures?.length === 0 && <p>Inga tvärbanor just nu</p>}
      {props.departures?.map((tram) => {
        return (
          <div key={tram.JourneyNumber}>
            <span
              className="line"
              style={{ backgroundColor: "rgb(164,165,167)" }}
            >
              {tram.LineNumber}
            </span>
            <span className="destination">{tram.Destination}</span>
            <span className="time">{tram.DisplayTime}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Trams;
