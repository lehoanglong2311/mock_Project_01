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
import axios from "axios";


export const UserContext = createContext({
  user: {},
  setUser: () => {},
  logout: () => {},
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
  const logout = () => {
    setUser({});
    localStorage.removeItem('userToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
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
    <UserContext.Provider value={{ user, setUser, logout }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
export default App;
