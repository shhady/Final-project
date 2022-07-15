import React from "react";
import SearchArea from "./MapsComp/search/SearchArea";
import Map from "./MapsComp/Map/Map";
import List from "./MapsComp/List/List";
import "./CourtsMaps.css";
export default function CourtsMaps() {
  return (
    <div>
      {/* <SearchArea /> */}
      {/* <div className="MapListContainer"> */}
      <div style={{ height: "90vh" }}>
        <List />
      </div>
      <div style={{ height: "90vh" }}>
        <Map />
      </div>
    </div>
    // </div>
  );
}
