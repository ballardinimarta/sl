import React from "react";
import { IBus } from "../interfaces/IBus";
interface IBusesProps {
  departures: IBus[];
}
function Buses(props: IBusesProps) {
  return (
    <div>
      <p className="title">Bussar</p>
      {props.departures?.length === 0 && <p>Inga bussar just nu</p>}

      {props.departures?.map((bus) => {
        return (
          <div key={bus.JourneyNumber}>
            {bus.GroupOfLine === "blåbuss" ? (
              <span
                className="line"
                style={{ backgroundColor: "rgb(0, 64, 154)" }}
              >
                {bus.LineNumber}
              </span>
            ) : (
              <span
                className="line"
                style={{ backgroundColor: "rgb(164, 17, 44)" }}
              >
                {bus.LineNumber}
              </span>
            )}
            <span className="destination">{bus.Destination}</span>
            <span className="time">{bus.DisplayTime}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Buses;
