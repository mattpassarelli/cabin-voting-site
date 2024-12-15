import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import ErrorPage from "./screens/ErrorPage";
import Trips from "./screens/Trips/Trips";
import Cabins from "./screens/Cabins/Cabins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "trips/:tripId/cabins",
        element: <Cabins />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
