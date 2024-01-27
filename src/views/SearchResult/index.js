import { useState } from "react";
import { formattedTime } from "../../utils/helpers";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import Button from "@mui/material/Button";
import './index.css'

function SearchResult() {

  const [forcastResponse]=useState(JSON.parse(localStorage.getItem('SearchResponse')))
    console.log(forcastResponse,'loadResults')
  return (
    <div className="forecastHomeMain">
      <div className='subMainOne'> 
      {forcastResponse?.message ? (
        <p className="whiteText">{forcastResponse.message}</p>
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <CloudRoundedIcon style={{ color: "white", fontSize: "40px" }} />
            <p className="whiteText">{forcastResponse?.main?.temp} C</p>
            <p className="whiteText">{forcastResponse?.name}</p>
            <p className="whiteText">
              It is {forcastResponse?.weather[0].main} right now
            </p>
          </div>
          <div className='ButtonsDiv'>
            <Button variant="outlined" className="forecastsInfoBtns">
              Wind{forcastResponse?.wind.speed} km/h
            </Button>
            <Button variant="outlined" className="forecastsInfoBtns">
              Sunrise: {formattedTime(forcastResponse?.sys.sunrise)}
            </Button>
            <Button variant="outlined" className="forecastsInfoBtns">
              SunSet: {formattedTime(forcastResponse?.sys.sunset)}
            </Button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default SearchResult;
