import { useNavigate, Outlet, NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import './ArticlesDetail.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getArticleDetail } from '../../Services/ApiServices';
import axios from 'axios';
const ArticlesDetail = () => {
    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([]);
    const { slug } = useParams()
    useEffect(() => {
        fetchArticleDetail()
        fetchComments()
    }, [])
    const fetchArticleDetail = async () => {
        try {
            const res = await getArticleDetail(slug)
            // console.log("detail", res);
            const data = res.data.article
            console.log("data", data);
            setArticle(data)

        } catch (error) {
            console.log(error);
        }

    }

    const fetchComments = async () => {
        try {
            const res = await axios.get(`https://api.realworld.io/api//articles/${slug}/comments`)
            console.log("comments", res);
            const data = res.data.comments
            console.log("long", data);
            setComments(data)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className='title  text-center text-white bg-dark'>
                <div className="container">

                    <h1 className='mb-3'>{article?.title}</h1>
                    <div className="header-articles-content d-flex">
                        <img src={article?.author?.image} className="rounded-circle" alt="Cinque Terre" width="40" height="40" />
                        <div className="info">

                            <Nav className="me-auto">
                                <NavLink className="" to={`/profiles/${article?.author?.username}`} style={{ fontSize: "15px", color: '#5CB85C' }}>
                                    {article?.author?.username}   </NavLink>

                            </Nav>
                            <span className='text-secondary' > {moment(article?.createdAt).format('MMMM D, YYYY')}</span>
                        </div>
                        <div className="col-5 ">
                            <button className="btn btn-outline button-Follow"><span><AiOutlinePlus />Follow Article {article.favoritesCount} </span></button>

                            <button className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                        </div>


                    </div>

                </div>

            </div>
            <div className="body-Article-detail container my-5">
                <div className="body-text-detail">
                    <p>  {article.body}</p>
                </div>
                <hr />
            </div>

            <div className="Comments-header ">
                <div className="header-articles-content d-flex justify-content-center">
                    <img src={article?.author?.image} className="rounded-circle" alt="Cinque Terre" width="40" height="40" />
                    <div className="info">

                        <Nav className="me-auto">
                            <NavLink className="" to={`/profiles/${article?.author?.username}`} style={{ fontSize: "15px", color: '#5CB85C' }}>
                                {article?.author?.username}   </NavLink>

                        </Nav>
                        <span className='text-secondary' > {moment(article?.createdAt).format('MMMM D, YYYY')}</span>
                    </div>
                    <div className="col-4 ">
                        <button className="btn btn-outline button-Follow"><span><AiOutlinePlus />Follow Article {article.favoritesCount} </span></button>

                        <button className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                    </div>


                </div>
            </div>

            <div className="comments-body  ">
                <div className="input-container ">
                    <p style={{ marginLeft: 260, marginTop: 40}}>Sign in or sign up to add comments on this article.</p>
                    <div className="comment-card-container row d-flex justify-content-center">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-card  col-7 ">
                                <div className="card-body ">
                                    {/* <textarea className="comment-area" rows="5" value={`${comment.body}`} readOnly></textarea> */}
                                    <p className='card-text'>{`${comment.body}`}</p>
                                    <div className="header-articles-content d-flex">
                                        <img src={comment?.author?.image} className="rounded-circle" alt="Cinque Terre" width="20" height="20" />
                                        <div className="info">
                                            <Nav className="me-auto">
                                                <NavLink className="" to={`/profiles/${comment?.author?.username}`} style={{ fontSize: "13px", color: '#5CB85C' }}>
                                                    {comment?.author?.username}
                                                </NavLink>
                                                <div style={{ fontSize: "13px", marginLeft: 10, color: 'grey' }}>{moment(comment?.createdAt).format('MMMM D, YYYY')}</div>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



        </div>



    );
};

export default ArticlesDetail;