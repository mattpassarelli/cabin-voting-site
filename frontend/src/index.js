import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import ErrorPage from "./screens/ErrorPage";
import Trips from "./screens/Trips";
import TripDetail from "./screens/TripDetail";

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
        path: "trip/:tripId",
        element: <TripDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
