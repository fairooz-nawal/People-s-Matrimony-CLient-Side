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
import CheckOut from "../Pages/Payment/CheckOut";
import MakeAdmin from "../Pages/Admin/MakeAdmin";
import AdminDashboardCount from "../Pages/Admin/AdminDashboardCount";
import ApprovedPremium from "../Pages/Admin/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Admin/ApprovedContactRequest";
import AdminProtectedRoute from "./AdminProtectedRoute";
import EditBio from "../Pages/DashBoard/EditBIo";
import ViewBiodata from "../Pages/DashBoard/ViewBioData";
import UserContactTable from "../Pages/DashBoard/UserContactTable";
import ViewFavouriteBio from "../Pages/DashBoard/ViewFavouriteBio";
import SuccessStories from "../Pages/DashBoard/SuccessStories";
import ErrorPage from "../Pages/ErrorPage";
import SuccessStory from "../Pages/Admin/SuccessStory";
import ContactUs from "../Pages/ContactUs";

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
          path:"contact-us",
          Component: ContactUs
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
            path:"/checkout/:id",
            element:<ProtectedRoute><CheckOut></CheckOut></ProtectedRoute>
        },
        {
            path:"/makeAdmin",
            element:<ProtectedRoute><MakeAdmin></MakeAdmin></ProtectedRoute>
        },
        {
            path:"/dashboard/admin",
            element:<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>,
            children:[
              {
               path:"/dashboard/admin",
               element:<AdminProtectedRoute><AdminDashboardCount></AdminDashboardCount></AdminProtectedRoute>
              },
              {
               path:"/dashboard/admin/makeAdmin",
               element: <AdminProtectedRoute><MakeAdmin></MakeAdmin></AdminProtectedRoute>
              },
              {
               path:"/dashboard/admin/makePremium",
               element:<AdminProtectedRoute><ApprovedPremium></ApprovedPremium></AdminProtectedRoute>
              },
              {
               path:"/dashboard/admin/approveContactRequest",
               element:<AdminProtectedRoute><ApprovedContactRequest></ApprovedContactRequest></AdminProtectedRoute>
              },
              {
               path:"/dashboard/admin/successStory",
               element:<AdminProtectedRoute><SuccessStory></SuccessStory></AdminProtectedRoute>
              },
            ]
        },
        {
            path:"/dashboard/user",
            element:<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>,
            children:[
              {
               path:"/dashboard/user",
               element:<ProtectedRoute><EditBio></EditBio></ProtectedRoute>
              },
              {
               path:"/dashboard/user/view-biodata/:email",
               element:<ProtectedRoute><ViewBiodata></ViewBiodata></ProtectedRoute>
              },
              {
               path:"/dashboard/user/contact-requests",
               element:<ProtectedRoute><UserContactTable></UserContactTable></ProtectedRoute>
              },
              {
               path:"/dashboard/user/favourites",
               element:<ProtectedRoute><ViewFavouriteBio></ViewFavouriteBio></ProtectedRoute>
              },
              {
               path:"/dashboard/user/SuccessStories",
               element:<ProtectedRoute><SuccessStories></SuccessStories></ProtectedRoute>
              },
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
  },
  {
    path:"*",
    Component:ErrorPage
  }
]);