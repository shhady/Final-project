import React, { useEffect, useState } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import FindGame from "./FindGame";
// const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleMapFunc() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries,
  });

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";
  return <Map />;
}

function Map() {
  // const center = useMemo(() => ({ lat: 32.6996, lng: 35.3035 }), []);
  const [courts, setCourts] = useState([
    // { lat: 32.6996, lng: 35.3035 },
    // { lat: 30.0444, lng: 31.2357 },
  ]);
  const [test, setTest] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selected, setSelected] = useState();
  const [selectedPaid, setSelectedPaid] = useState(null);
  const [address, setAddress] = useState(null);
  const [findgamenow, setFindgamenow] = useState(true);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [showCourtDetails, setShowCourtDetails] = useState(false);
  const [term, setTerm] = useState("");
  const [free, setFree] = useState(null);
  // console.log(selected);

  useEffect(() => {
    const search = async () => {
      const results = await axios.get("http://localhost:8080/freecourt");
      setTest(results.data);
    };
    search();
  }, []);

  useEffect(() => {
    const search = async () => {
      const results = await axios.get("http://localhost:8080/courts");
      setCourts(results.data);
    };
    search();
  }, []);

  // console.log(currentLocation);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div style={{ marginTop: "10vh" }}>
      <div>
        <div className="btnsFilterFreePaid">
          <button className="btnFilterFreePaid" onClick={() => setFree(true)}>
            Free Courts
          </button>
          <button className="btnFilterFreePaid" onClick={() => setFree(false)}>
            Paid Courts
          </button>
        </div>
        <button
          onClick={() => {
            setFindgamenow(!findgamenow);
          }}
        >
          Show Map
        </button>
        {/* <DebounceInput
          minLength={1}
          debounceTimeout={400}
          type="text"
          placeholder="Search Courts by city"
          className="search"
          style={{ backgroundColor: "#d3d3d3", textAlign: "center" }}
          onChange={(e) => setTerm(e.target.value)}
        /> */}
      </div>
      {findgamenow && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={currentLocation}
          options={options}
        >
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
              style={{ zIndex: "10" }}
            >
              <div>
                <p>{selected.courtType}</p>
                <p>{selected.address}</p>
              </div>
            </InfoWindow>
          ) : null}
          {selectedPaid ? (
            <InfoWindow
              position={{ lat: selectedPaid.lat, lng: selectedPaid.lng }}
              onCloseClick={() => setSelectedPaid(null)}
            >
              <div>
                <p>{selectedPaid.courtType}</p>
                <p>{selectedPaid.address}</p>
                <p>price per hour: {selectedPaid.price}</p>

                {/* <FindGame
                        type={paidcourt.courtType}
                        address={address}
                        price={paidcourt.price}
                      /> */}
                {/* <Link to="FindGame"> */}
                <button
                  onClick={() => {
                    setFindgamenow(!findgamenow);
                    setShowCourtDetails(!showCourtDetails);
                  }}
                >
                  Play
                </button>
                {/* </Link> */}
              </div>
            </InfoWindow>
          ) : null}
          {free ? (
            <>
              {" "}
              {test.map((court, idx) => {
                console.log(court.lat);
                return (
                  <MarkerF
                    position={{ lat: court.lat, lng: court.lng }}
                    key={idx}
                    onClick={() => setSelected(court)}
                  ></MarkerF>
                );
              })}
            </>
          ) : (
            <>
              {courts.map((paidcourt, idx) => {
                return (
                  <MarkerF
                    position={{ lat: paidcourt.lat, lng: paidcourt.lng }}
                    key={idx}
                    label="$"
                    onClick={() => {
                      setSelectedPaid(paidcourt);
                      setAddress(paidcourt.address);
                      setType(paidcourt.courtType);
                      setPrice(paidcourt.price);
                    }}
                  ></MarkerF>
                );
              })}
            </>
          )}
        </GoogleMap>
      )}
      {showCourtDetails ? (
        <FindGame address={address} price={price} type={type} />
      ) : null}
    </div>
  );
}
