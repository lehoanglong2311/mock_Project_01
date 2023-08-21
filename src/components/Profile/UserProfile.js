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
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';

import { MdOutlineFavorite } from 'react-icons/md'
import { DeleteLike, Like, getFavoritesArticles, getMyArticles } from '../../Services/ApiServices';

const UserProfile = () => {
    const { username } = useParams();
    console.log("username", username);
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const { user, token } = useContext(UserContext);
    const loggedInUserName = user.username;
    // const token = user.token
    ///////////////////
    const [isFavorite, setIsFavorite] = useState(true);
    const [articlesFilter, setArticlesFilter] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [tab, setTab] = useState('My articles')
    console.log("tab", tab);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const totalPagesModify = Math.ceil(totalPages / 10);
    const handlePageChange = ({ selected }) => {
        console.log("selected", selected);
        setCurrentPage(selected + 1)
    }
    const handleChangeMyArticles = () => {
        setIsFavorite(true)
        setTab("My articles")
        setCurrentPage(1)
    }
    const handleChangeFavoritedArticles = () => {
        setIsFavorite(false)
        setTab("Favorited Articles")
        setCurrentPage(1)


    }
    ////////////////////
    useEffect(() => {
        // if (!token) {
        //     navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu không có token
        //     return;
        //   }

        if (tab === 'My articles') {
            fetchMyArticles()
        }
        if (tab === "Favorited Articles") {
            fetchFavoritesArticles()
        }
    }, [currentPage, tab,])
    // useEffect(() => {
    //     fetchMyArticles()

    // }, [])
    const fetchMyArticles = async () => {
        try {
            setIsLoading(true);
            //chưa có token thì load những bài ko cần token,còn có rồi thì load những bài cần token, ví dụ như bài đăng của chính mình
            const res = await getMyArticles(currentPage, token ? token : "", username);
            const data = res.data.articles
            console.log("getMyArticles", res);
            setArticlesFilter(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);

        } catch (error) {
            console.error(error);

        }

    }
    const fetchFavoritesArticles = async () => {
        try {
            setIsLoading(true);
            //chưa có token thì load những bài ko cần token,còn có rồi thì load những bài cần token, ví dụ như bài đăng của chính mình
            const res = await getFavoritesArticles(currentPage, token ? token : "", username);
            const data = res.data.articles
            console.log("getFavoritesArticles", res);
            setArticlesFilter(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);

        } catch (error) {
            console.error(error);

        }

    }
    ////////////////////////////////
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
        // if (tab === 'My articles') {
        //     fetchMyArticles()
        // }
        // if (tab === "Favorited Articles") {
        //     fetchFavoritesArticles()
        // }

    }, [username,]);

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
        navigate(`/settings`);
    };
    const handleTrueFalseFavorites = async (slug,favorited) => {
        // alert(favorited)
        if (!user.token) {
            navigate('/login');
            return;
        }
        // console.log("Favorite", Favorite);
        try {
            if (favorited) {
                const res = await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
                    headers: {
                        'Authorization': `Bearer ${token ? token : ""}`
                    }
                });;
                console.log("unlike", res);
            } else {
                const res = axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`,null, {
                    headers: {
                        'Authorization': `Bearer ${token ? token : ""}`
                    }
                });
            
                console.log("like", res);
            }
           // Toggle the follow status
           const updatedArticles = articlesFilter.map(article => {
            if (article.slug === slug) {
                return {
                    ...article,
                    favorited: !favorited,
                    favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1
                };
            }
            return article;
        });

        setArticlesFilter(updatedArticles);
            // if (favorited) {
            //     alert('Bài viết bỏ thích');
            // } else {
            //     alert('Bài viết đã thích');
            // }
        } catch (error) {
            console.error('Error favorites user:', error);
        }
    }


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

            <div >
                <Navbar  >
                    <Container>
                        <Row>
                            <Col xs="12">
                                <Nav variant="underline" defaultActiveKey="/">
                                    <NavLink className={`Feed ${isFavorite ? "ActiveMyArticles" : ""} `} to={`/profiles/${username}`} onClick={() => handleChangeMyArticles()} >
                                        My Articles
                                    </NavLink>
                                    <NavLink className={`Feed ${isFavorite ? "" : "ActiveMyArticles"} `} onClick={() => handleChangeFavoritedArticles()}>
                                        Favorited Articles
                                    </NavLink>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </div>
            <div className="row">
                <div className="articles-container col-md-9 mx-auto ">
                    {!isLoading && articlesFilter.length === 0 && (
                        <h4>No articles in here...</h4>
                    )}
                    {
                        isLoading ? (
                            <div className="text-center">
                                <AiOutlineLoading3Quarters className="loading-icon" />
                                <p>Loading...</p>
                            </div>
                        )
                            :
                            (

                                articlesFilter.map((article, index) => {
                                    return (
                                        <div className="articles-content">
                                            <div className="header-articles-content d-flex">
                                                <img src={article?.author?.image} className="rounded-circle" alt="Cinque Terre" width="40" height="40" />

                                                <div className="info col-10">

                                                    <Nav className="me-auto">
                                                        <NavLink className="" to={`/profiles/${article?.author?.username}`} style={{ fontSize: "15px", color: '#5CB85C' }}>
                                                            {article?.author?.username}   </NavLink>

                                                    </Nav>
                                                    <span className='text-secondary' > {moment(article?.createdAt).format('MMMM D, YYYY')}</span>
                                                </div>
                                                <div className="col-2 button-tym-container">
                                                {article.favorited ?
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug,article.favorited)} className="btn btn-success"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                        :
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug,article.favorited)} className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                        }

                                                </div>

                                            </div>
                                            {/* onClick={() => { handleClickDetail(article.slug) }} */}
                                            {/* to={`/article/${article.slug}`} */}
                                            <div className="body-articles-content" >
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
                                    )

                                })
                            )







                    }


                </div>
            </div>

            {

                <div className={`pagination ${isLoading ? 'hide-pagination' : ''}`}>
                    <ReactPaginate
                        previousLabel={null}
                        nextLabel={null}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPagesModify}
                        previousClassName={'previous'}
                        nextClassName={'next'}
                        pageRangeDisplayed={totalPagesModify}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        //đặt lại mỗi khi thay đổi trang đã set currentpage thành 1 , nên khi chuyển trang sẽ hiển thị trang đầu tiên 1-1 = 0
                        //forcePage được sử dụng để ép buộc component ReactPaginate hiển thị một trang cụ thể. lúc này activeClassName cũng hoạt động theo forcePage
                        forcePage={currentPage - 1}
                    // forcePage ={}
                    />

                </div>
            }
        </>
    );
};

export default UserProfile;
