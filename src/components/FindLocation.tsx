import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { IStop } from "../interfaces/IStop";
import StopButtons, {
  Departure,
  Deviation as DeviationType,
} from "./StopButtons";
import Trams from "./Trams";
import Metros from "./Metros";
import Buses from "./Buses";
import Deviation from "./Deviation";
function FindLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDepartures, setIsLoadingDepartures] = useState(false);
  const [stops, setStops] = useState<IStop[]>();
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [deviations, setDeviations] = useState<DeviationType[]>([]);
  const [buses, setBuses] = useState<Departure[]>();
  const [metros, setMetros] = useState<Departure[]>();
  const [trams, setTrams] = useState<Departure[]>();
  function getLatLong() {
    setIsLoading(true);

    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        getStops(pos.coords.latitude, pos.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function getStops(lat: number, long: number) {
    let apilink = `/api/stops/${lat}/${long}`;

    axios
      .get(apilink)
      .then(function (response) {
        setStops(response.data.stopLocationOrCoordLocation);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    setBuses(
      departures.filter((departure) => departure.line.transport_mode === "BUS")
    );
    setMetros(
      departures.filter(
        (departure) => departure.line.transport_mode === "METRO"
      )
    );
    setTrams(
      departures.filter((departure) => departure.line.transport_mode === "TRAM")
    );
  }, [departures]);
  return (
    <>
      <div id="find">
        <button id="findbutton" onClick={getLatLong}>
          Hitta Hållplatser
        </button>
      </div>
      {isLoading ? (
        <Rings color="#ffffff" height={100} width={100} />
      ) : (
        <div id="stops">
          {stops?.map((stop) => {
            return (
              <StopButtons
                key={stop.StopLocation.name}
                stopname={stop.StopLocation.name}
                mainMastExtId={stop.StopLocation.mainMastExtId}
                setDepartures={setDepartures}
                setIsLoading={setIsLoadingDepartures}
                setDeviations={setDeviations}
              />
            );
          })}
        </div>
      )}
      {isLoadingDepartures && (
        <Rings color="#ffffff" height={100} width={100} />
      )}
      {departures.length > 0 && (
        <div id="departures">
          <Metros departures={metros || []} />
          <Buses departures={buses || []} />
          <Trams departures={trams || []} />
        </div>
      )}
      {deviations.length > 0 && (
        <div id="deviations">
          {deviations.map((deviation) => {
            return <Deviation key={deviation.id} {...deviation} />;
          })}
        </div>
      )}
    </>
  );
}

export default FindLocation;
