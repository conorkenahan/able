import React from "react";
import ReactDOM from "react-dom";
import MyReviews from "./MyReviews";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <MyReviews />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
