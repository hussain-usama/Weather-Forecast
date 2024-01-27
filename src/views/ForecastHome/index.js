import "./index.css";
import { useEffect, useState } from "react";
import { formattedTime } from "../../utils/helpers";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import Button from "@mui/material/Button";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function ForecastHome() {
  const [forcastResponse, setforcastResponse] = useState();
  const [loading, setloading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    fetchApi("Pakistan");
  }, []);

  const fetchApi = async (value) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=46ac2283a1b407a0979c1ee2081ef26b`;
      const response = await fetch(url);
      const resJson = await response.json();
      setforcastResponse(resJson);
      setloading(false);
      return resJson
    } catch (error) {
      setforcastResponse({ message: "Something Went Wrong!" });
      setloading(true)
      console.log("ApiError", error.message);
    }
  };
  const searchResults = async () => {
    setloading(true)
    let response= await fetchApi(searchValue);
    console.log(response,'response')
    localStorage.setItem('SearchResponse',JSON.stringify(response))
    let getSearches=JSON.parse(localStorage.getItem('SearchResults')) ?? []
    getSearches.push(searchValue)
    localStorage.setItem('SearchResults', JSON.stringify(getSearches))
    navigate(`/search/${searchValue}`)
  };

  return (
    <>
      <Loader open={loading} />
      <div className="forecastHomeMain">
        <div className="subMainOne">
          <div>
            <input
              className="searchField"
              placeholder="Search city..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="outlined"
              className="forecastsInfoBtns"
              onClick={searchResults}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              className="forecastsInfoBtns"
              onClick={()=>navigate('/history')}
            >
              View History
            </Button>
          </div>
          {forcastResponse?.message ? (
            <p className="whiteText">{forcastResponse.message}</p>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                <CloudRoundedIcon
                  style={{ color: "white", fontSize: "40px" }}
                />
                <p className="whiteText">{forcastResponse?.main?.temp} C</p>
                <p className="whiteText">{forcastResponse?.name}</p>
                <p className="whiteText">
                  It is {forcastResponse?.weather[0].main} right now
                </p>
              </div>
              <div className="ButtonsDiv">
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
    </>
  );
}

export default ForecastHome;
