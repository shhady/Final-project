import React from "react";
import Header from "./components/Header";
// import Hero from "./components/Hero";
// import CourtsMaps from "./components/CourtsMaps";
import Home from "./Home";
import AddCourt from "./components/AddCourt";
import AddFreeCourt from "./components/AddFreeCourt";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import GoogleMapFunc from "./components/GoogleMap";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/AddCourt" exact component={AddCourt} />
        <Route path="/AddFreeCourt" exact component={AddFreeCourt} />
        <Route path="/Register" exact component={Register} />
        <Route path="/GoogleMap" exact component={GoogleMapFunc} />
      </BrowserRouter>
    </div>
  );
}

export default App;
