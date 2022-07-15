// import React, { useState } from "react";
// import ReactMapGL from "react-map-gl";
// import GoogleMapReact from "google-map-react";

// import { useLoadScript, GoogleMap } from "@react-google-maps/api";
export default function Map() {
  // const [viewport, setViewport] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   zoom: 10,
  //   width: "100%",
  //   height: "100%",
  // });
  // const { useLoadScript } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyBJhBXO8rkWH-btCC443vNMvZol5r-XzXg",
  // });

  // if (!useLoadScript) {
  //   return <div>loading</div>;
  // }
  // const coords = { lat: 0, lng: 0 };
  return (
    <div>
      {/* <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      /> */}
      {/* Markers
      </ReactMapGL> */}

      {/* <GoogleMap zoom={15}></GoogleMap> */}

      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBJhBXO8rkWH-btCC443vNMvZol5r-XzXg" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={() => {
          return;
        }}
        onChildClick={""}
      ></GoogleMapReact> */}
    </div>
  );
}
