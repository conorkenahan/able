import React from "react";
import ReactDOM from "react-dom";
import PlaceReviews from "./PlaceReviews";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PlaceReviews />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
