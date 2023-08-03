import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Setting from './Setting';

const SettingScreen = () => {

    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://api.realworld.io/api/profiles/${username}`);
                setUserData(response.data.profile);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <>
         {userData && (
            <Setting username={username} userData={userData} />
         )}   
        </>
    );
};

export default SettingScreen;