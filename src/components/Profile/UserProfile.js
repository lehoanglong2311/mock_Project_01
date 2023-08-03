import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
// import Setting from './Setting'; // Import the Setting component

const UserProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

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

    const handleEditProfile = () => {
        navigate(`/settings/${username}`);
    };

    return (
        <>
            {userData && (
                <div className='bg-profile p-5 text-center'>
                    {userData.image && (
                        <img className='avatar' src={userData.image} alt={`${userData.username}'s profile`} />
                    )}

                    <h4 className='mb-3 mt-3'>{userData.username}</h4>
                    <p className='user-bio mb-3'>{userData.bio}</p>
                    <Button className='edit-profile-btn' variant="outline-secondary" onClick={handleEditProfile}>
                        <i className="fa-solid fa-gear"></i> Edit Profile Settings
                    </Button>

                    {/* <Setting username={username} userData={userData} /> */}
                </div>
            )}
        </>
    );
};

export default UserProfile;
