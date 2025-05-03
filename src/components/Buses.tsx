import React from "react";
import { Departure } from "./StopButtons";

interface IBusesProps {
  departures: Departure[];
}
function Buses(props: IBusesProps) {
  return (
    <div>
      <p className="title">Bussar</p>
      {props.departures?.length === 0 && <p>Inga bussar just nu</p>}

      {props.departures?.map((bus) => {
        return (
          <div key={bus.journey.id}>
            {bus.line.group_of_lines === "blåbuss" ? (
              <span
                className="line"
                style={{ backgroundColor: "rgb(0, 64, 154)" }}
              >
                {bus.line.designation}
              </span>
            ) : (
              <span
                className="line"
                style={{ backgroundColor: "rgb(164, 17, 44)" }}
              >
                {bus.line.designation}
              </span>
            )}
            <span className="destination">{bus.destination}</span>
            <span className="time">{bus.display}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Buses;
