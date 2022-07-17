import React, { useState } from "react";
import SearchArea from "./MapsComp/search/SearchArea";
import Map from "./MapsComp/Map/Map";
import List from "./MapsComp/List/List";

import "./CourtsMaps.css";
import GoogleMapFunc from "./GoogleMap";
export default function CourtsMaps() {
  return (
    <div>
      {/* <SearchArea /> */}
      <div>
        <div>
          <GoogleMapFunc />
        </div>
        <div style={{ height: "90vh" }}>
          {/* <Map /> */}
          <List />
        </div>
      </div>
      //{" "}
    </div>
  );
}
