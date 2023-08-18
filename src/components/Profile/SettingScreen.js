import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Setting from './Setting';
import { UserContext } from "../../App";

const SettingScreen = () => {
  const { token } = useContext(UserContext);

    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("https://api.realworld.io/api/user", {
            headers: {
              Authorization: `Token ${localStorage.getItem("userToken")}`,
            },
          });         
          setUserData(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, [token]);

    return (
        <>
         {userData && (
            <Setting username={username} userData={userData} />
         )}   
        </>
    );
};

export default SettingScreen;