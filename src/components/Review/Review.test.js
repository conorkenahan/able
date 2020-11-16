import React from "react";
import ReactDOM from "react-dom";
import Review from "./Review";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Review />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
