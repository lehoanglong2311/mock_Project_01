import './App.css';
import NavBar from './components/Articles/NavBar';
import Home from './components/Articles/Home';
import SignIn from './components/LoginSignup/SignIn';
import SignUp from './components/LoginSignup/SignUp';
import UserProfile from './components/Profile/UserProfile';
import SettingScreen from './components/Profile/SettingScreen';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticlesDetail from './components/Articles/ArticlesDetail';


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
  return <RouterProvider router={router} />;
}
export default App;