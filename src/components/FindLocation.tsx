import axios from 'axios';
import React, { useState } from 'react'
import Loader from 'react-loader-spinner';
import { IStop } from '../interfaces/IStop';
import StopButtons from './StopButtons';
function FindLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [stops, setStops] = useState<IStop[]>()

    function getLatLong () {
        setIsLoading(true);

        window.navigator.geolocation.getCurrentPosition((pos)=> {
            getStops(pos.coords.latitude, pos.coords.longitude);
            
       }, (error)=> {
            console.log(error);
       })
    }

    function getStops (lat: number, long: number) {
        let apilink = `/api/stops/${lat}/${long}`;

        axios.get(apilink)
        .then(function (response) {
            setStops(response.data.stopLocationOrCoordLocation);
            setIsLoading(false);

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
        /> :
         <div id="stops">
            {stops?.map(stop => {
                    return(
                        <StopButtons key={stop.StopLocation.name} stopname={stop.StopLocation.name} />
                    )
            })}
        </div>}

        </>
    )
}

export default FindLocation
