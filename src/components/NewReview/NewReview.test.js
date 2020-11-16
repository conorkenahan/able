import React from "react";
import ReactDOM from "react-dom";
import NewReview from "./NewReview";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NewReview />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
