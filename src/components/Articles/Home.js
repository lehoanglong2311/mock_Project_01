import { React, useEffect, useState, createContext, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import './Home.css';
import { getArticlesGlobal, getArticleFollow, getPopularTags, getPopularTagRender, DeleteLike, Like } from '../../Services/ApiServices';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import { UserContext } from '../../App';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios';

const Home = () => {
    const [articles, setArticles] = useState([])
    const [tab, setTab] = useState('global feed')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [popularTags, setPopularTags] = useState([])
    

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //lay user su dung destructuring { }
    //lấy token const token = localStorage.getItem('userToken');
    // thay vì user.token vì khi load lại trang vẫn ok chứ không bị mất những bài đăng của mình.
    const { user, token } = useContext(UserContext);

    // console.log("user",user);
    useEffect(() => {
        // if (!token) {
        //     navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu không có token
        //     return;
        //   }

        if (tab === 'global feed') {
            fetchArticlesGlobal()
        }
        if (tab === "your feed") {
            fetchArticleFollow()
        }
        if (popularTags.includes(tab)) {
            fetchPopularTagRender()
        }
        fetchPopularTags()
    }, [currentPage, tab])
    console.log("tab", tab);
    const fetchArticlesGlobal = async () => {
        try {
            setIsLoading(true);
            //chưa có token thì load những bài ko cần token,còn có rồi thì load những bài cần token, ví dụ như bài đăng của chính mình
            const res = await getArticlesGlobal(currentPage, token ? token : "");
            const data = res.data.articles
            console.log("res", res);
            setArticles(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);

        } catch (error) {
            console.error(error);

        }

    }
    const fetchPopularTagRender = async () => {
        try {
            setIsLoading(true);
            const res = await getPopularTagRender(currentPage, token ? token : "", tab);
            const data = res.data.articles
            console.log("getPopularTagRendernder", res);
            setArticles(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);

        } catch (error) {
            console.error(error);

        }

    }
    //token
    // const token = user.token

    // console.log("token",token);
    const fetchArticleFollow = async () => {
        try {
            setIsLoading(true);

            const res = await getArticleFollow(token, currentPage);
            const data = res.data.articles
            console.log("your feed", res);
            setArticles(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);



        } catch (error) {
            console.error(error);

        }

    }
    const fetchPopularTags = async () => {

        try {
            const res = await getPopularTags();
            console.log("popular tag", res);
            const data = res.data.tags
            console.log("popular tag", data);

            setPopularTags(data)
        } catch (error) {
            console.log(error);
        }



    }
    console.log("golobal", articles);
    const totalPagesModify = Math.ceil(totalPages / 10);
    console.log("totalPagesModify", totalPagesModify);
    const handlePageChange = ({ selected }) => {
        console.log("selected", selected);
        setCurrentPage(selected + 1)
    }

    console.log("currentPage", currentPage);
    const handleChangeYourFeed = () => {
       
        setTab("your feed")
        setCurrentPage(1)
    }
    const handleChangeGlobalFeed = () => {

        
        setTab("global feed")
        setCurrentPage(1)


    }
    const handleDisplayTagsByArticle = (tag) => {
        console.log("tag", tag);
      
        setTab(tag)
        setCurrentPage(1)

    }
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
           const updatedArticles = articles.map(article => {
            if (article.slug === slug) {
                return {
                    ...article,
                    favorited: !favorited,
                    favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1
                };
            }
            return article;
        });

        setArticles(updatedArticles);
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

            <div className='p-5 text-center text-white bg-success'>
                <h1 className='mb-3'>conduit</h1>
                <h5 className='mb-3'>A place to share your knowledge.</h5>
                {/* <h2>{`Hello ${user} again!`}</h2> */}
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <Navbar  >
                            <Container>
                                <Nav className="me-auto">
                                    {token && <NavLink className={`Feed ${tab === 'your feed' ? 'activeFeed' : ''}`} onClick={() => { handleChangeYourFeed() }}>Your Feed</NavLink>}
                                    <NavLink className={`Feed ${tab === 'global feed' ? 'activeFeed' : ''}`} onClick={() => { handleChangeGlobalFeed() }}>Global Feed</NavLink>
                                    {popularTags.includes(tab) && <NavLink className={"Feed activeFeed"}  >{tab}</NavLink>
                                    }
                                </Nav>
                            </Container>
                        </Navbar>
                        <hr />
                        <div className="articles-container">
                            {
                                isLoading ? (
                                    <div className="text-center">
                                        <AiOutlineLoading3Quarters className="loading-icon" />
                                        <p>Loading...</p>
                                    </div>
                                )
                                    :
                                    (

                                        articles.map((article, index) => {
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

                                                                        <li className="tag-list-li " >{tag}</li>
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
                    </div>



                    <div className="col-md-3">

                        <div className="container-popular-tags">   Popular Tags <br />
                            {popularTags.map((tag, index) => {
                                return (
                                    <>

                                        <li className="popular-Tags" onClick={() => handleDisplayTagsByArticle(tag)}>{tag}</li>
                                    </>

                                )
                            })
                            }
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;