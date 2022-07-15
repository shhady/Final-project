import React, { useState } from "react";
import "./styleAddCourt.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import axios from "axios";
import useOnclickOutside from "react-cool-onclickoutside";

export default function AddCourt() {
  const [form, setForm] = useState({});
  const [addedCourt, setAddedCourt] = useState(true);
  const [courtType, setCourtType] = useState("");
  const [chosenCity, setChosenCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [price, setPrice] = useState(0);
  const [coords, setCoords] = useState(null);

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
      axios.post("http://localhost:8080/courts", {
        courtType: courtType,
        address: chosenCity,
        lat: coords.lat,
        lng: coords.lng,
        email: email,
        phone: phone,
        from: from,
        to: to,
        price: price,
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
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <button
          style={{ width: "60%" }}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
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
              onChange={(e) => setCourtType(e.target.value)}
              type="text"
              name={"courtType"}
              placeholder={"Court Type"}
              required
            />

            <h5>Address: </h5>
            <div ref={ref}>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Type Address"
              />
              {status === "OK" && <>{renderSuggestions()}</>}
            </div>
            <h5>Email: </h5>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name={"email"}
              placeholder={"Email Address"}
              required
            />
            <h5>Phone Number: </h5>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name={"phone"}
              placeholder={"Phone number"}
              required
            />
            <h5>Price per Hour: </h5>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              name={"price"}
              placeholder={"price"}
              required
            />
            <h5>Working Hours: </h5>
            <label>From:</label>
            <input
              onChange={(e) => setFrom(e.target.innerText)}
              type="time"
              name={"from"}
              placeholder={"starting from:"}
              required
            />
            <label>To:</label>
            <input
              onChange={(e) => setTo(e.target.innerText)}
              type="time"
              name={"to"}
              placeholder={"Until:"}
              required
            />
            <input type="submit" className="btn-submit" />
          </form>
        ) : (
          <div>Court Has Been Added</div>
        )}
      </div>
    </div>
  );
}
