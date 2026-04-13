import { createBrowserRouter } from "react-router";
import Portfolio from "./Portfolio";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Portfolio,
  },
  {
    path: "*",
    Component: Portfolio,
  },
]);
