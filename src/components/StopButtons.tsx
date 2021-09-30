import axios from "axios";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { IBus } from "../interfaces/IBus";
import Buses from "./Buses";
import Metros from "./Metros";
import Trams from "./Trams";

interface IStopButtonsProps {
  stopname: string;
}

function StopButtons(props: IStopButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [buses, setBuses] = useState<IBus[]>();
  const [metros, setMetros] = useState<IBus[]>();
  const [trams, setTrams] = useState<IBus[]>();

  function findSiteId(name: string) {
    setIsLoading(true);
    let apilink =`/api/stop/${name}`;
    axios
      .get(apilink)
      .then(function (response) {
        showDepartures(response.data.ResponseData[0].SiteId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function showDepartures(siteId: string) {
    let apilink = `/api/departures/${siteId}`;
    axios
      .get(apilink)
      .then(function (response) {
        setBuses(response.data.ResponseData.Buses);
        setMetros(response.data.ResponseData.Metros);
        setTrams(response.data.ResponseData.Trams);
        setShowResults(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <button
        key={props.stopname}
        className="stops"
        onClick={() => {
          findSiteId(props.stopname);
        }}
      >
        {props.stopname}
      </button>
      {showResults && (
        <div id="results">
          <Metros departures={metros || []} />
          <Buses departures={buses || []} />
          <Trams departures={trams || []} />
        </div>
      )}
      {isLoading && (
        <Loader
          type="Rings"
          color="#ffffff"
          height={100}
          width={100}
        />
      )}
    </>
  );
}

export default StopButtons;
