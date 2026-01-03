import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home";
import AllVehicles from "../pages/AllVehicles";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import Error404 from "../pages/Error404";
import ViewDetails from "../pages/ViewDetails.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import DashboardHome from "../pages/dashboard/DashboardHome.jsx";
import MyVehicles from "../pages/dashboard/MyVehicles.jsx";
import MyBookings from "../pages/dashboard/MyBookings.jsx";
import AddVehicle from "../pages/dashboard/AddVehicle.jsx";
import UpdateVehicle from "../pages/dashboard/UpdateVehicle.jsx";
import Profile from "../pages/dashboard/Profile.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import BookVehicles from "../pages/dashboard/BookVehicles.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('https://travelease-vehicle-booking.vercel.app/models')
      },
      {
        path: "/allVehicles",
        element: <AllVehicles />,
        loader: () => fetch('https://travelease-vehicle-booking.vercel.app/models')
      },
  
      {
        path: "/about",
        element: <About />

      },
      {
        path: "/contact",
        element: <Contact />

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


    ]

  },


  {
    path: "/dashboard",
    element: (<PrivateRoute> <DashboardLayout /> </PrivateRoute>),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />
      },
      {
        path: "/dashboard/my-vehicles",
        element: <MyVehicles />
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />
      },
      {
        path: "/dashboard/add-vehicle",
        element: <AddVehicle />
      },
      {
        path: "/dashboard/book-vehicle",
        element: <BookVehicles />,
      },

      {
        path: "/dashboard/update-vehicle/:id",
        element: <UpdateVehicle />
      },
      {
        path: "/dashboard/profile",
        element: <Profile />
      },
    ],
  },



  { path: "*", element: <Error404 /> }
]);
