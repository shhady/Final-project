import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export default function FindGame(props) {
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState(null);
  const [missing, setMissing] = useState(null);
  const [teamsRegistered, setTeamsRegistered] = useState(null);
  const [showNewListing, setShowNewListing] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNewListing(!showNewListing);
    try {
      axios.post("http://localhost:8080/team", {
        time: time,
        players: players,
        missing: missing,
      });
      //   setAddedCourt(!addedCourt);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const search = async () => {
      const result = await axios.get("http://localhost:8080/team");
      setTeamsRegistered(result.data);
    };
    search();
  }, []);

  const drawOnScreen = () => {
    return teamsRegistered.map((team, idx) => {
      console.log(idx);
      return (
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
          key={idx}
        >
          <h3>{team.time}</h3>
          <h3>{team.players}</h3>
          <h3>{team.missing}</h3>
          <button>Join</button>
        </div>
      );
    });
  };
  return (
    <div>
      <p>{props.type}</p>
      <p>{props.address}</p>
      <p>price per hour:{props.price}</p>
      <button
        onClick={() => {
          setShowNewListing(!showNewListing);
        }}
      >
        Reserve
      </button>

      {showNewListing && (
        <form onSubmit={handleSubmit}>
          <h5>Time: </h5>
          <input
            onChange={(e) => {
              setTime(e.target.value);
            }}
            type="text"
            name={"time"}
            placeholder={"example 10-12AM"}
          />
          <h5>players: </h5>
          <input
            onChange={(e) => {
              setPlayers(e.target.value);
            }}
            type="number"
            name={"player"}
            placeholder={"Number of players"}
          />
          <h5>Missing: </h5>
          <input
            onChange={(e) => {
              setMissing(e.target.value);
            }}
            type="number"
            name={"missing"}
            placeholder={"missing"}
          />
          <input type="submit" className="btn-submit" />
        </form>
      )}
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          <h3>Time</h3>
          <h3>Players</h3>
          <h3>Missing</h3>
          <h3>Join</h3>
        </div>
        {teamsRegistered ? drawOnScreen() : null}
      </div>
    </div>
  );
}
