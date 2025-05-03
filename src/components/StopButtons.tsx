import axios from "axios";
import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import Buses from "./Buses";
import Metros from "./Metros";
import Trams from "./Trams";

interface IStopButtonsProps {
  mainMastExtId: string;
  stopname: string;
  setDepartures: React.Dispatch<React.SetStateAction<Departure[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDeviations: React.Dispatch<React.SetStateAction<Deviation[]>>;
}

export interface Departure {
  destination: string;
  direction_code: number;
  direction: string;
  state: string;
  display: string;
  scheduled: string;
  expected: string;
  journey: Journey;
  stop_area: StopArea;
  stop_point: StopPoint;
  line: Line;
  deviations: any[];
}

export interface Journey {
  id: number;
  state: string;
  prediction_state: string;
}

export interface StopArea {
  id: number;
  name: string;
  type: string;
}

export interface StopPoint {
  id: number;
  name: string;
  designation: string;
}

export interface Line {
  id: number;
  designation: string;
  transport_mode: string;
  group_of_lines: string;
}

export interface Deviation {
  id: number;
  importance_level: number;
  message: string;
  scope: Scope;
}

export interface Scope {
  stop_areas: StopArea[];
  stop_points: StopPoint[];
  lines: Line[];
}

function StopButtons(props: IStopButtonsProps) {
  const siteId = props.mainMastExtId.toString().replace("30010", "");
  function showDepartures(siteId: string) {
    let apilink = `/api/departures/${siteId}`;
    axios
      .get(apilink)
      .then(function (response: {
        data: {
          departures: Departure[];
          stop_deviations: Deviation[];
        };
      }) {
        props.setIsLoading(false);
        props.setDepartures(response.data.departures);
        props.setDeviations(response.data.stop_deviations);
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
          showDepartures(siteId);
        }}
      >
        {props.stopname}
      </button>
    </>
  );
}

export default StopButtons;
