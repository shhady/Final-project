import React, { useState, useEffect } from "react";
import "./styleAddCourt.css";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default function AddCourt() {
  const [form, setForm] = useState({});
  const [addedCourt, setAddedCourt] = useState(true);
  const [chosenCity, setChosenCity] = useState(null);
  const [coords, setCoords] = useState(null);
  const [courtType, setCourtType] = useState(null);
  // console.log(chosenCity);
  // console.log(coords);
  // useEffect(() => {
  //   const search = async () => {
  //     const result = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${myAddress}&key=AIzaSyAh5imk8lJ8VeuCOSNrPK46NRMIcSKY1Sc`
  //     );
  //     setConvertedAddress(result.data);
  //   };
  //   search();
  // }, [myAddress]);
  // console.log(convertedAddress);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8080/freecourt", {
        courtType: courtType,
        address: chosenCity,
        lat: coords.lat,
        lng: coords.lng,
      });
      setAddedCourt(!addedCourt);
    } catch (error) {
      console.log(error);
    }
  };

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setCoords({ lat, lng });
        setChosenCity(description);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion, idx) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      console.log(place_id);
      return (
        <button key={place_id + idx} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </button>
      );
    });
  return (
    <div className="MainContainerAddCourt">
      <div>
        <h1>Add Court</h1>
      </div>
      <div className="formContainer">
        {addedCourt ? (
          <form onSubmit={handleSubmit}>
            <h5>Court Type: </h5>
            <input
              onChange={(e) => {
                setCourtType(e.target.value);
              }}
              type="text"
              name={"courtType"}
              placeholder={"Court Type"}
              // value={""}
            />
            <h5>Address: </h5>
            <div ref={ref}>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Type Address"
                style={{ width: "99%" }}
              />
              {status === "OK" && <>{renderSuggestions()}</>}
            </div>
            <input type="submit" className="btn-submit" />
          </form>
        ) : (
          <div>Court Has Been Added Successfully</div>
        )}
      </div>
    </div>
  );
}
