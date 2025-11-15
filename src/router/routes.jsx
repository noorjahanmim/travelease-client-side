import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home";
import AllVehicles from "../pages/AllVehicles";
import AddVehicle from "../pages/AddVehicle";
import MyVehicles from "../pages/MyVehicles";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import Error404 from "../pages/Error404";
import ViewDetails from "../pages/ViewDetails.jsx";
import UpdateVehicle from "../pages/UpdateVehicle.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/allVehicles",
        element: <AllVehicles />
      },
      {
        path: "/addVehicle",
        element: <PrivateRoute><AddVehicle /></PrivateRoute>
      },
      {
        path: "/myVehicles",
        element: <PrivateRoute><MyVehicles /></PrivateRoute>
      },
      {
        path: "/myBookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },

      {
        path: "/login",
        element: <Login />

      },
      {
        path: "/register",
        element: <Register />
      },

      {
        path: "/vehicles/:id",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/updateVehicle/:id",
        element: <PrivateRoute>
          <UpdateVehicle />
        </PrivateRoute>
      },


    ]

  },



  { path: "*", element: <Error404 /> }
]);
