import React, { useState } from 'react'
import Loader from "react-loader-spinner";
import axios from 'axios';

interface IStop {
    'StopLocation':
    {'dist': number,
    'extId': string,
    'hasMainMast': boolean,
    'id': string,
    'lat': number,
    'lon': number,
    'mainMastExtId': string,
    'mainMastId': string,
    'name': string,
    'products': number,
    'weight': number}
}
interface IBus {
    Destination: string,
    DisplayTime: string,
    ExpectedDateTime: string,
    GroupOfLine: string,
    JourneyDirection: number,
    JourneyNumber: number,
    LineNumber: string,
    TimeTabledDateTime: string,
    TransportMode: string
}
function GetData() {
    
    const [showResults, setShowResults] = useState(false);
    const [siteId, setSiteId] = useState(" ");
    const [stops, setStops] = useState<IStop[]>()
    const [buses, setBuses] = useState<IBus[]>()
    const [metros, setMetros] = useState<IBus[]>()
    const [trams, setTrams] = useState<IBus[]>()
    const [isLoading, setIsLoading] = useState(false);
    function getLatLong () {
        setIsLoading(true);

        window.navigator.geolocation.getCurrentPosition((pos)=> {
            //getStops(pos.coords.latitude, pos.coords.longitude);
            getStops(59.3097497,18.0197013);
            
       }, (error)=> {
            console.log(error);
       })
    }

    function getStops (lat: number, long: number) {
        let apilink = `/api/stops/${lat}/${long}`;
        console.log(apilink);

        axios.get(apilink)
        .then(function (response) {
            console.log(response.data);
            setStops(response.data.stopLocationOrCoordLocation);
            setIsLoading(false);

          })
          .catch(function (error) {
            console.log(error);
          })
        
    }

    function findSiteId(name: string) {
        let apilink = `/api/stop/${name}`;
        axios.get(apilink)
        .then(function (response) {
            console.log(response.data.ResponseData[0].SiteId)
            setSiteId(response.data.ResponseData[0].SiteId);
            showDepartures()
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    function showDepartures () {
        let apilink = `/api/departures/${siteId}`;
        axios.get(apilink)
        .then(function (response) {
            console.log(response.data.ResponseData)
            setShowResults(true)
            setBuses(response.data.ResponseData.Buses)
            setMetros(response.data.ResponseData.Metros)
            setTrams(response.data.ResponseData.Trams)

          })
          .catch(function (error) {
            console.log(error);
          })
    }
    return (
        <>
        <div id="find">
             <button id="findbutton" onClick={getLatLong}>Hitta Hållplatser</button>
        </div>
        {isLoading ?  <Loader
        type="Rings"
        color="#ffffff"
        height={100}
        width={100}
        timeout={3000} //3 secs
        /> :
         <div id="stops">
            {stops?.map(stop => {
                    return(
                        <button className="stops" onClick={() => {findSiteId(stop.StopLocation.name)}}>{stop.StopLocation.name}</button>
                    )
            })}
        </div>}
       
        
        {showResults && <div id="results">
                <div>
                    <p className="title">Bussar</p> 
                    {buses?.length === 0 && <p>Inga bussar just nu</p>}

                {buses?.map(bus => {
                    return (
                        <div>
                            {bus.GroupOfLine === "blåbuss" ?
                            <span className="line" style={{backgroundColor: "rgb(0, 64, 154)"}}>{bus.LineNumber}</span> :
                            <span className="line" style={{backgroundColor: "rgb(164, 17, 44)"}}>{bus.LineNumber}</span>}
                            <span className="destination">{bus.Destination}</span>
                            <span className="time">{bus.DisplayTime}</span>
                        </div>
                    )
                })}
                </div>

                <div>
                    <p className="title">Tunnelbana</p> 
                    {metros?.length === 0 && <p>Inga tunnelbanor just nu</p>}

                {metros?.map(metro => {
                    return (
                        <div>
                            {metro.GroupOfLine === "tunnelbanans gröna linje" &&  <span className="line" style={{backgroundColor: "rgb(96, 164, 43)"}}>{metro.LineNumber}</span> }
                            {metro.GroupOfLine === "tunnelbanans röda linje" &&  <span className="line" style={{backgroundColor: "rgb(164, 17, 44)"}}>{metro.LineNumber}</span>}
                            {metro.GroupOfLine === "tunnelbanans blåa linje" && <span className="line" style={{backgroundColor: "rgb(0, 64, 154)"}}>{metro.LineNumber}</span>}
                           
                            <span className="destination">{metro.Destination}</span>
                            <span className="time">{metro.DisplayTime}</span>
                        </div>
                    )
                })}
                </div>

                <div>
                    <p className="title">Tvärbana</p> 
                {trams?.length === 0 && <p>Inga tvärbanor just nu</p>}
                {trams?.map(tram => {
                    return (
                        <div>
                            <span className="line" style={{backgroundColor: "rgb(164,165,167)"}}>{tram.LineNumber}</span>    
                            <span className="destination">{tram.Destination}</span>
                            <span className="time">{tram.DisplayTime}</span>
                        </div>
                    )
                })}
                </div>
            </div> }
            
           
           
        </>
    )
}

export default GetData
