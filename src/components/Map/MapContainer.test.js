import React from "react";
import ReactDOM from "react-dom";
import MapContainer from "./MapContainer";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MapContainer />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
