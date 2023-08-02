import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
    });
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
        navigate('/settings');
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
                </div>
            )}
        </>
    );
};

export default UserProfile;
