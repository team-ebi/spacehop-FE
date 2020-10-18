import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BusinessContext } from "../useContext/BusinessContext";
import { UserContext } from "../useContext/UserContext";
import {
  LocationContext,
  DateContext,
  StartTimeContext,
  EndTimeContext,
} from "../useContext/Search";
import { useHistory } from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo.png";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import "./Search.css";

require("dotenv").config();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#80cc37",
    },
    secondary: {
      main: "#000",
    },
  },
});

export default function Search() {
  // may or may not need coordinates
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // context will be passed to bizCard
  const { location, setLocation } = useContext(LocationContext);
  const { date, setDate } = useContext(DateContext);
  const { startTime, setStartTime } = useContext(StartTimeContext);
  const { endTime, setEndTime } = useContext(EndTimeContext);
  const { setBusinesses } = useContext(BusinessContext);
  const { user } = useContext(UserContext);

  //change backend server target
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  //variable to access routes history
  const history = useHistory();

  // handles location update when location is selected in input
  const handleLocationSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng)
    setLocation(value);
    setCoordinates(latLng);
  };

  //handle selected data
  //get entered data from imput
  async function getSelectedData() {
    // parse the location
    const selectedLocation = location.split(",")[0];

    const selectedDate = new Date(date);

    // parse day from selected date
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDay = week[selectedDate.getDay()];

    // parse time from selected start time
    const selectedStartTime = new Date(startTime).getHours();

    // parse time from selected start time
    const selectedEndtime = new Date(endTime).getHours();

    // set data to axios.get(http://) then get filtered data
    const res = await axios.get(
      `${baseUrl}/api/availability/?day=${selectedDay}&address_city=${selectedLocation}&start_hour=${selectedStartTime}&end_hour=${selectedEndtime}`
    );

    // set businesses state
    setBusinesses(res.data);
    // open list
    return history.push("/list");
  }

  return (
    <div id="search-container">
      <div id="logo-container">
        <img id="logo" src={logo} alt="logo" />
      </div>

      <div id="mobile-welcome">
        {/* if user is logged in, will greet by name */}
        <h2>{`Welcome${
          user && user.attributes ? ", " + user.attributes.given_name : ""
        }!`}</h2>
      </div>

      <div id="search-bar-container">
        <div id="search-bar">
          {/* this google maps api autofill location search will update
        location and coordinates states*/}
          <div className="input" id="location-input-field">
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
              onSelect={handleLocationSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    id="location-input"
                    {...getInputProps({ placeholder: "Where to?" })}
                  />
                  <div id="autocomplete-selections">
                    {loading ? <div>...loading</div> : null}

                    {/* this will delay autofill options as user types */}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#80cc37"
                          : "white",
                        padding: "7px",
                      };
                      return (
                        <div
                          key={suggestion}
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          {/* datepicker will update selectedDate state */}
          <div className="input time">
            {/* select date */}
            <ThemeProvider theme={theme}>
              <DatePicker
                autoOk
                label="Date"
                value={date}
                onChange={(date) => setDate(date)}
                animateYearScrolling
                disablePast={true}
                cancelLabel={false}
                okLabel={false}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </ThemeProvider>
          </div>
          <div className="input time">
            {/* select start time */}
            <ThemeProvider theme={theme}>
              <TimePicker
                autoOk
                label="Start Time"
                className="date-input"
                value={startTime}
                onChange={(time) => setStartTime(time.startOf('hour'))}
                disablePast={true}
                views={["hours"]}
                cancelLabel={false}
                okLabel={false}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </ThemeProvider>
          </div>
          <div className="input time">
            {/* select end time */}
            <ThemeProvider theme={theme}>
              <TimePicker
                autoOk
                label="End Time"
                className="date-input"
                value={endTime}
                onChange={(time) => setEndTime(time.startOf('hour'))}
                disablePast={true}
                views={["hours"]}
                cancelLabel={false}
                okLabel={false}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </ThemeProvider>
          </div>
          {/* when this button is clicked, list of available
        businesses will be displayed */}
          <div id="search-button-container">
            <button id="search-button" onClick={getSelectedData}>
              <div>
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </div>
              <div id="search-text">Search</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
