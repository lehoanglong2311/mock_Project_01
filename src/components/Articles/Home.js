import { React, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import './Home.css';
import { getArticlesGlobal } from '../../Services/ApiServices';
const Home = () => {
    const [articles, setArticles] = useState([])
    const [offSet,setOffSet] = useState(0)

    useEffect(() => {
        fetchArticlesGlobal()

    }, [])
    const fetchArticlesGlobal = async () => {
        try {
            const res = await getArticlesGlobal();
            const data = res.data.articles
            console.log("res", res);
            setArticles(data)
        } catch (error) {
            console.error(error);

        }

    }
    return (

        <>
            <div className='p-5 text-center text-white bg-success'>
                <h1 className='mb-3'>conduit</h1>
                <h5 className='mb-3'>A place to share your knowledge.</h5>
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <Navbar  >
                            <Container>
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" >Global Feed</NavLink>
                                    <NavLink className="nav-link" to="/">Your Feed</NavLink>
                                </Nav>
                            </Container>
                        </Navbar>
                        <div className="articles-container">
                            {articles.map((article, index) => {
                                return (
                                    <div className="articles-content">
                                        <div className="header-articles-content">
                                            <img src="https://i.pinimg.com/736x/eb/58/cc/eb58cc5cfecde2911c1bd9bb8df69ce7.jpg" class="rounded-circle" alt="Cinque Terre" width="40" height="40" />
                                            {/* <a>{article?.author?.username}</a> */}
                                            {/* <NavLink className="nav-link" to="/photos">{article?.author?.username}</NavLink> */}

                                            <Nav className="me-auto">
                                                <NavLink className="nav-link" to="/photos">{article?.author?.username}</NavLink>
                                            </Nav>
                                        </div>
                                        <div className="body-articles-content"></div>

                                        <hr />
                                    </div>
                                )

                            })


                            }

                        </div>
                    </div>



                    <div className="col-md-2"> Popular Tags</div>
                </div>
            </div>

        </>
    );
};

export default Home;