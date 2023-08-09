import { React, useEffect, useState, createContext, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import './Home.css';
import { getArticlesGlobal, getArticleFollow, getPopularTags } from '../../Services/ApiServices';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import { UserContext } from '../../App';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Home = () => {
    const [articles, setArticles] = useState([])
    const [tab, setTab] = useState('global feed')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [popularTags, setPopularTags] = useState([])
    const [isYourFeed, setIsYourFeed] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    //lay user su dung destructuring { }
    const { user } = useContext(UserContext);
    // console.log("user",user);
    useEffect(() => {
        if (tab === 'global feed') {
            fetchArticlesGlobal()
        }
        if (tab === "your feed") {
            fetchArticleFollow()
        }
        fetchPopularTags()
    }, [currentPage, tab])
    console.log("tab",tab);
    const fetchArticlesGlobal = async () => {
        try {
            setIsLoading(true);
            const res = await getArticlesGlobal(currentPage);
            const data = res.data.articles
            console.log("res", res);
            setArticles(data)
            setTotalPages(res.data.articlesCount)
            setIsLoading(false);
          
        } catch (error) {
            console.error(error);

        }

    }
    //token
    const token = user.token

    // console.log("token",token);
    const fetchArticleFollow = async () => {
        try {
            setIsLoading(true);
            const res = await getArticleFollow(token,currentPage);
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

    const totalPagesModify = Math.ceil(totalPages / 10);
console.log("totalPagesModify",totalPagesModify);
    const handlePageChange = ({ selected }) => {
        console.log("selected",selected);
        setCurrentPage(selected + 1)
    }
   
    console.log("currentPage",currentPage);
    const handleChangeYourFeed = () => {
        setIsYourFeed(true)
        setTab("your feed")
        setCurrentPage(1)
    }
    const handleChangeGlobalFeed = () => {
        setIsYourFeed(false)
        setTab("global feed")
        setCurrentPage(1)


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
                                    {token && <NavLink className={`Feed ${isYourFeed ? "activeFeed" : ""} `} to="/" onClick={() => { handleChangeYourFeed() }}>Your Feed</NavLink>}

                                    <NavLink className={`Feed ${isYourFeed ? "" : "activeFeed"} `} to="/" onClick={() => { handleChangeGlobalFeed() }}>Global Feed</NavLink>
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
                                                                <button className="btn btn-outline button-tym"><span><MdOutlineFavorite /> {article.favoritesCount} </span></button>

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
                            {popularTags.map((tags, index) => {
                                return (
                                    <>

                                        <li className="popular-Tags">{tags}</li>
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