import {createBrowserRouter,} from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import BioData from "../Pages/BioData";
import AuthLayout from "../Layout/AuthLayout";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoutes";
import BiodataDetails from "../Pages/BioDataDetail";
import DashBoard from "../Pages/DashBoard/DashBoard";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:"/biodatas",
            element:<ProtectedRoute><BioData></BioData></ProtectedRoute>
        },
        {
            path:"/biodataDetail/:id",
            element:<ProtectedRoute><BiodataDetails></BiodataDetails></ProtectedRoute>
        },
        {
            path:"/dashboard",
            element:<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>,
            children:[
              {
                path:"/dashboard",
                element:<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>
              }
            ]
        }
    ]
  },
  {
    path:"/auth",
    Component: AuthLayout,
    children:[
       {
            path:"/auth/login",
          element:<Login></Login>
        },
        {
            path:"/auth/register",
            Component:Registration
        },
       

    ]
  }
]);