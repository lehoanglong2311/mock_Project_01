import { React, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import './Home.css';
import { getArticlesGlobal } from '../../Services/ApiServices';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
const Home = () => {
    const [articles, setArticles] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchArticlesGlobal()

    }, [currentPage])
    const fetchArticlesGlobal = async () => {
        try {
            const res = await getArticlesGlobal(currentPage);
            const data = res.data.articles
            console.log("res", res);
            setArticles(data)
            setTotalPages(res.data.articlesCount)
        } catch (error) {
            console.error(error);

        }

    }
    const totalPagesModify = Math.ceil(totalPages / 10);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1)

    }
    return (

        <>
            <div className='p-5 text-center text-white bg-success'>
                <h1 className='mb-3'>conduit</h1>
                <h5 className='mb-3'>A place to share your knowledge.</h5>
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <Navbar  >
                            <Container>
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" >Global Feed</NavLink>
                                    <NavLink className="nav-link" to="/">Your Feed</NavLink>
                                </Nav>
                            </Container>
                        </Navbar>
                        <hr />
                        <div className="articles-container">
                            {articles.map((article, index) => {
                                return (
                                    <div className="articles-content">
                                        <div className="header-articles-content d-flex">
                                            <img src={article?.author?.image} class="rounded-circle" alt="Cinque Terre" width="40" height="40" />

                                            <div className="info col-10">

                                                <Nav className="me-auto">
                                                    <NavLink className="" to="/photos" style={{ fontSize: "15px", color: '#5CB85C' }}>
                                                        {article?.author?.username}   </NavLink>

                                                </Nav>
                                                <span className='text-secondary' > {moment(article?.createdAt).format('MMMM D, YYYY')}</span>
                                            </div>
                                            <div className="col-1">
                                                <button>loasd</button>

                                            </div>

                                        </div>
                                        <div className="body-articles-content"></div>

                                        <h4>{article.title}</h4>
                                        <p>{article.description}</p>
                                        <span>Read more...</span>

                                        {article.tagList.map((tag) => {
                                            return (
                                                <>
                                                    <ul class="tag-list">
                                                        <li>{tag}</li>
                                                        

                                                    </ul>
                                                </>
                                            )

                                        })

                                        }

                                        <hr />
                                    </div>
                                )

                            })


                            }

                        </div>
                        <div className="pagination">
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
                            />

                        </div>
                    </div>



                    <div className="col-md-3"> Popular Tags</div>
                </div>
            </div>

        </>
    );
};

export default Home;