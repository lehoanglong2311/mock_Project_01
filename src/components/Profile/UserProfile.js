import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdPersonAdd } from 'react-icons/io';
import { UserContext } from '../../App';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

const UserProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const loggedInUserName = user.username;
    const token = user.token

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
        if (user.token) {
            checkFollowingStatus(user.token);
        }
    }, [user.token]);

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
        if (!user.token) {
            navigate('/login');
            return;
        }

        try {
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
                        {loggedInUserName === username ? ( // Check if the logged-in user matches the profile's user
                            <Button className='edit-profile-btn' variant="outline-secondary" onClick={handleEditProfile}>
                                <i className="fa-solid fa-gear"></i> Edit Profile Settings
                            </Button>
                        ) : (
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
                        )}
                    </div>
                </div>
            )}
            
            <div>
                <Navbar  >
                    <Container>
                        <Row>
                            <Col xs="12">
                                <Nav variant="underline" defaultActiveKey="/">
                                    <Nav.Item>
                                        <Nav.Link href="/#test2">
                                            My Articles
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="/#test2">
                                            Favorited Articles
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </div>
        </>
    );
};

export default UserProfile;
