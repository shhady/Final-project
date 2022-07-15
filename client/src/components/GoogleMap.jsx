import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  infoWindow,
} from "@react-google-maps/api";

// const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
};
const center = {
  lat: 32.6996,
  lng: 35.3035,
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
  const [free, setFree] = useState(false);
  const [paid, setpaid] = useState(true);

  useEffect(() => {
    const search = async () => {
      const results = await axios.get("http://localhost:8080/freecourt");
      setTest(results.data);
    };
    search();
  }, []);
  console.log(test);

  useEffect(() => {
    const search = async () => {
      const results = await axios.get("http://localhost:8080/courts");
      setCourts(results.data);
    };
    search();
  }, []);
  console.log(courts);

  // console.log(currentLocation);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  }, []);

  return (
    <div style={{ marginTop: "10vh" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={currentLocation}
        options={options}
      >
        {test.map((court) => {
          return (
            <MarkerF
              position={{ lat: court.lat, lng: court.lng }}
              key={court.lat}
            />
          );
        })}
        {courts.map((court) => {
          return (
            <MarkerF
              position={{ lat: court.lat, lng: court.lng }}
              key={court.lat}
              label="$"
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
