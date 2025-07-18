import {createBrowserRouter,} from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import BioData from "../Pages/BioData";
import AuthLayout from "../Layout/AuthLayout";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";


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