import React, { useEffect, useState , useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdPersonAdd } from 'react-icons/io'; // Import IoMdPersonAdd icon from react-icons/io
import { UserContext } from '../../App';

const UserProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false); // To keep track of the follow status
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    console.log("chinhuser",user);
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

    useEffect(() => {
        // Check if the user is already followed when the component mounts
        // For demonstration purposes, you can set a dummy JWT token here
        // const token = "your_jwt_token_here"; // Replace this with your actual JWT token
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGF2YW5jaGluaDIwMDJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0dmMifSwiaWF0IjoxNjkwOTQ0MTEzLCJleHAiOjE2OTYxMjgxMTN9.ozB96UzVfpyqcYslozzKhAz1fPuYZqqh6PZwexDPNno"
        if (token) {
            checkFollowingStatus(token);
        }
    }, []);
    const token = user.token
    console.log("chinh token",token);
    const checkFollowingStatus = async (token) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(`https://api.realworld.io/api/profiles/${username}`, config);
            setIsFollowing(response.data.profile.following);
        } catch (error) {
            console.error('Error checking following status:', error);
        }
    };

    const handleFollowProfile = async () => {
        try {
            // const token = "your_jwt_token_here"; // Replace this with your actual JWT token
            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGF2YW5jaGluaDIwMDJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0dmMifSwiaWF0IjoxNjkwOTQ0MTEzLCJleHAiOjE2OTYxMjgxMTN9.ozB96UzVfpyqcYslozzKhAz1fPuYZqqh6PZwexDPNno"
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            if (isFollowing) {
                await axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`, config);
            } else {
                await axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, null, config);
            }
            setIsFollowing(!isFollowing); // Toggle the follow status
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

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
                    <div>
                        <Button className='edit-profile-btn' variant="outline-secondary" onClick={handleEditProfile}>
                            <i className="fa-solid fa-gear"></i> Edit Profile Settings
                        </Button>
                        <Button className='follow-profile-btn' variant="outline-secondary" onClick={handleFollowProfile}>
                            {isFollowing ? (
                                <>
                                    <IoMdPersonAdd /> Unfollow {userData.username}
                                </>
                            ) : (
                                <>
                                    <IoMdPersonAdd /> Follow {userData.username}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
