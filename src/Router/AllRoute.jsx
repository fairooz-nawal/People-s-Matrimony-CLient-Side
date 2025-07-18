import {createBrowserRouter,} from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import BioData from "../Pages/BioData";
import AuthLayout from "../Layout/AuthLayout";
import Registration from "../Pages/Registration";

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
            Component:BioData
        }
    ]
  },
  {
    path:"/auth",
    Component: AuthLayout,
    children:[
        {
            path:"/auth/register",
            Component:Registration
        },
        {
            path:"/auth/login",
            Component:Registration
        },

    ]
  }
]);