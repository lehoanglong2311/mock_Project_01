import { useNavigate, Outlet, NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import {AiOutlinePlus} from 'react-icons/ai'
import './ArticlesDetail.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getArticleDetail } from '../../Services/ApiServices';
const ArticlesDetail = () => {
    const [article, setArticle] = useState({})
    const { slug } = useParams()
    useEffect(() => {
        fetchArticleDetail()
    }, [])
    const fetchArticleDetail = async () => {
        try {
            const res = await getArticleDetail(slug)
            console.log("detail", res);
            const data = res.data.article
            console.log("data", data);


            setArticle(data)

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
                                <NavLink className="" to="/photos" style={{ fontSize: "15px", color: '#5CB85C' }}>
                                    {article?.author?.username}   </NavLink>

                            </Nav>
                            <span className='text-secondary' > {moment(article?.createdAt).format('MMMM D, YYYY')}</span>
                        </div>
                        <div className="col-5 ">
                        <button className="btn btn-outline button-Follow"><span><AiOutlinePlus />Favorites Article {article.favoritesCount} </span></button>

                            <button className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default ArticlesDetail;