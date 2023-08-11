import "./App.css";
import NavBar from "./components/Articles/NavBar";
import Home from "./components/Articles/Home";
import SignIn from "./components/LoginSignup/SignIn";
import SignUp from "./components/LoginSignup/SignUp";
import UserProfile from "./components/Profile/UserProfile";
import SettingScreen from "./components/Profile/SettingScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, createContext } from "react";
import ArticlesDetail from "./components/Articles/ArticlesDetail";
import NewArticle from "./components/Articles/NewArticle";

export const UserContext = createContext();
export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/editor",
        element: <NewArticle />,
      },
      {
        path: "/article/:slug",
        element: <ArticlesDetail />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/profiles/:username",
        element: <UserProfile />,
      },
      {
        path: "/settings/:username",
        element: <SettingScreen />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
export default App;
