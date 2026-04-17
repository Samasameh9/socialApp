import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import ForYou from "./components/Home/ForYou";
import { HeroUIProvider } from "@heroui/react";
import { AuthContextProvider } from "./context/authContext";
import Profile from "./components/profile/Profile";
import ProtectRoutes, { PublicRoute } from "./components/ProtectRoutes";
import SinglePost from "./components/SinglePost/SinglePost";
import ChangePass from "./components/Login/ChangePass";
import NotFound from "./components/NotFound";
import AllBookmarks from "./components/posts/AllBookmarks";
import UserProfileDetails from './components/profile/UserProfileDetails'
import Home from "./components/Home/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
         {
        path: "/",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),},
        { path: "/changepassword", element: <ChangePass/>},
        {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
         { path: '*', element: <NotFound /> },
        {
          path: "foryou",
          element: (
            <ProtectRoutes>
              <ForYou />
            </ProtectRoutes>
          ),
        },
         {
          path: "home",
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectRoutes>
              <Profile />
            </ProtectRoutes>
          ),
        },
         {
          path: "userprofileDetails/:userId",
          element: (
            <ProtectRoutes>
              <UserProfileDetails/>
            </ProtectRoutes>
          ),
        },
         {
          path: "AllBookmarks",
          element: (
            <ProtectRoutes>
              <AllBookmarks/>
            </ProtectRoutes>
          ),
        },
        {
          path: "singlePost/:id",
          element: (
            <ProtectRoutes>
              <SinglePost />
            </ProtectRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <HeroUIProvider>
        <AuthContextProvider>
          {" "}
          <RouterProvider router={router} />
        </AuthContextProvider>
      </HeroUIProvider>
    </>
  );
}

export default App;
