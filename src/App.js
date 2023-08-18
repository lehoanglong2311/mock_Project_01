import "./App.css";
import NavBar from "./components/Articles/NavBar";
import Home from "./components/Articles/Home";
import SignIn from "./components/LoginSignup/SignIn";
import SignUp from "./components/LoginSignup/SignUp";
import UserProfile from "./components/Profile/UserProfile";
import SettingScreen from "./components/Profile/SettingScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import ArticlesDetail from "./components/Articles/ArticlesDetail";
import NewArticle from "./components/Articles/NewArticle";
import axios from "axios";
import EditArticle from "./components/Articles/EditArticle";


export const UserContext = createContext({
  user: {},
  setUser: () => {},
  logout: () => {},
  updateUser: () => {},
});
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
        path: "/editor/:slug",
        element: <EditArticle />,
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
        path: "/settings/",
        element: <SettingScreen />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState({});
  
  const logout = () => {
    setUser({});
    localStorage.removeItem('userToken');
  };
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  const token = localStorage.getItem('userToken');
  useEffect(() => {
    if (token) {
      axios.get('https://api.realworld.io/api/user', {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then(response => {
        setUser(response.data.user);
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout ,updateUser,token}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
export default App;
