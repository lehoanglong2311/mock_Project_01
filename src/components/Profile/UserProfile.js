import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { IoMdPersonAdd } from 'react-icons/io';
import { UserContext } from '../../App';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md';

const UserProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const loggedInUserName = user.username;
    const token = user.token
    const [userArticles, setUserArticles] = useState([]);
    const [favoritedArticles, setFavoritedArticles] = useState([]);
    const [activeTab, setActiveTab] = useState('userArticles');

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

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://api.realworld.io/api/profiles/${username}`);
            setUserData(response.data.profile);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleTabChange = async (tab) => {
        try {
            if (tab === 'userArticles') {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get(`https://api.realworld.io/api/articles?author=${username}&limit=5&offset=0`, config);
                setUserArticles(response.data.articles);
                console.log(response.data.articles);
                setActiveTab(tab);
            } else if (tab === 'favoritedArticles') {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get(`https://api.realworld.io/api/articles?favorited=${username}&limit=5&offset=0`, config);
                setFavoritedArticles(response.data.articles);
                console.log(response.data.articles);
                setActiveTab(tab);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        handleTabChange(activeTab);
    }, [username, activeTab]);
    

    const renderArticle = (article) => {
        return (
            <div className="articles-content" key={article.slug}>
                <div className="header-articles-content d-flex">
                    <img src={article?.author?.image} className="rounded-circle" alt="Author's Profile" width="40" height="40" />

                    <div className="info col-10">
                        <Nav className="me-auto">
                            <NavLink className="" to={`/profiles/${article?.author?.username}`} style={{ fontSize: "15px", color: '#5CB85C' }}>
                                {article?.author?.username}   </NavLink>
                        </Nav>
                        <span className='text-secondary'>
                            {moment(article?.createdAt).format('MMMM D, YYYY')}
                        </span>
                    </div>
                    <div className="col-2 button-tym-container">
                        <button className="btn btn-outline button-tym">
                            <span>
                                <MdOutlineFavorite /> {article.favoritesCount}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="body-articles-content">
                    <NavLink className="Navlink" to={`/article/${article.slug}`}  >
                        <h4 style={{ color: 'black' }}>{article.title}</h4>
                        <p>{article.description}</p>
                        {article.tagList.map((tag) => {
                            return (
                                <>
                                    <li className="tag-list-li ">{tag}</li>
                                </>
                            )
                        })
                        }
                        <br />
                        <span>Read more...</span>
                    </NavLink>
                </div>
                <hr />
            </div>
        );
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
                <Navbar>
                    <Container>
                        <Row>
                            <Col xs="12">
                                <Nav variant="underline" defaultActiveKey="/">
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handleTabChange('userArticles')}>
                                            My Articles
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handleTabChange('favoritedArticles')}>
                                            Favorited Articles
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </div>

            <Container>
                {activeTab === 'userArticles' &&
                    userArticles.map((article) => renderArticle(article))}
                {activeTab === 'favoritedArticles' &&
                    favoritedArticles.map((article) => renderArticle(article))}
            </Container>

            
        </>
    );
};

export default UserProfile;
