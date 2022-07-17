import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Autocomplete } from "@react-google-maps/api";
import { DebounceInput } from "react-debounce-input";

import "./List.css";
export default function List() {
  const [allCourts, setAllCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [term, setTerm] = useState("");
  const [free, setFree] = useState(null);
  const [allFreeCourts, setAllFreeCourts] = useState([]);
  const [filteredFreeCourts, setFilteredFreeCourts] = useState([]);
  const [test, setTest] = useState("");
  // const [autocomplete, setAutocomplete] = useState(null);
  // const [filteredSports, setFilteredSports] = useState("f");
  // const [sport, setSport] = useState("");

  // const onLoad = (autoC) => setAutocomplete(autoC);
  // console.log(autocomplete);
  useEffect(() => {
    const search = async () => {
      const response = await axios.get("http://localhost:8080/freecourt");
      setAllFreeCourts(response.data);
    };
    search();
  }, []);

  useEffect(() => {
    const filteredFree = allFreeCourts.filter((court) =>
      court.address.toLowerCase().includes(term)
    );
    setFilteredFreeCourts(filteredFree);
    // console.log(filteredFree);
  }, [term, allFreeCourts]);

  useEffect(() => {
    const search = async () => {
      const response = await axios.get("http://localhost:8080/courts");
      setAllCourts(response.data);
    };
    search();
  }, []);

  useEffect(() => {
    const filtered = allCourts.filter((court) =>
      court.address.toLowerCase().includes(term)
    );
    setFilteredCourts(filtered);

    // console.log(filtered);
  }, [term, allCourts]);

  if (!allCourts) return null;
  if (!filteredCourts) return null;

  const insertData = () => {
    return filteredCourts.map((court, idx) => {
      console.log(court._id);
      return (
        <div
          key={idx}
          style={{ border: "1px solid black" }}
          className="CourtsList"
        >
          <div>Court: {court.courtType}</div>
          {/* <div>City: {court.city}</div> */}
          {/* <div>From: {court.from}</div> */}
          <div>Phone Number: {court.phone}</div>
          <div>Address: {court.address}</div>
          {/* <div>To: {court.to}</div> */}
          <div>Price per Hour: {court.price}</div>

          <button className="reserveBTN">Reserve</button>
        </div>
      );
    });
  };

  const insertDataFreeCourt = () => {
    return filteredFreeCourts.map((court, idx) => {
      console.log(court._id);
      return (
        <div
          key={idx}
          style={{ border: "1px solid black" }}
          className="freeCourtsList"
        >
          <div>Court: {court.courtType}</div>
          {/* <div>City: {court.city}</div> */}
          <div>Address: {court.address}</div>
          <button className="reserveBTN">Reserve</button>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div className="btnsFilterFreePaid">
          <button className="btnFilterFreePaid" onClick={() => setFree(true)}>
            Free Courts
          </button>
          <button className="btnFilterFreePaid" onClick={() => setFree(false)}>
            Paid Courts
          </button>
        </div>
        {/* <Autocomplete
          onLoad={onLoad}
          // onChange={}
        > */}
        <DebounceInput
          minLength={1}
          debounceTimeout={400}
          type="text"
          placeholder="Search Courts by city"
          className="search"
          style={{ backgroundColor: "#d3d3d3", textAlign: "center" }}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      {free ? <div>{insertDataFreeCourt()}</div> : <div>{insertData()}</div>}
    </div>
  );
}
