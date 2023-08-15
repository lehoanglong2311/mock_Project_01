import { useNavigate, Outlet, NavLink, useParams, redirect } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import { AiOutlinePlus, AiFillDelete, AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import './ArticlesDetail.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getArticleDetail, getCurrentUser, } from '../../Services/ApiServices';
import axios from 'axios';
import { UserContext } from '../../App';
const ArticlesDetail = () => {
    const [article, setArticle] = useState({})
    // const [curentUser, setCurentUser] = useState({})
    const [comments, setComments] = useState([]);
    const { slug } = useParams()
    const { user, token } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState("")
    const navigate = useNavigate();

    console.log("uer", user);
    useEffect(() => {
        // fetchCurrentUser()

        fetchArticleDetail()
        fetchComments()
    }, [])

    const fetchArticleDetail = async () => {
        try {
            setIsLoading(true);

            const res = await getArticleDetail(slug)
            // console.log("detail", res);
            const data = res.data.article
            console.log("getArticleDetail", data);
            setArticle(data)
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }

    }
    // const fetchCurrentUser = async () => {
    //     try {
    //         const res = await getCurrentUser(token)
    //         const data = res.data.user
    //         console.log("currenUser", data);
    //         setCurentUser(data)
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    const fetchComments = async () => {
        try {

            const res = await axios.get(`https://api.realworld.io/api//articles/${slug}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token ? token : ""}`
                }
            })
            console.log("comments", res);
            const data = res.data.comments
            setComments(data)

        } catch (error) {
            console.log(error);
        }
    }

    const PostComments = async () => {
        try {
            const data1 = {
                comment: {
                    "body": newComment
                }
            }
            const res = await axios.post(`https://api.realworld.io/api//articles/${slug}/comments`, data1, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("commentsPost", res);
            const data = res.data.comment
            setComments([...comments, data]);
            setNewComment("");



        } catch (error) {
            console.log(error);
        }
    }
    const handleEditArticle = () => {
        navigate(`/editor/${slug}`, { state: { article } })
    }
    return (
        <div>
            {
                isLoading ? (
                    <div className="text-center">
                        <AiOutlineLoading3Quarters className="loading-icon" />
                        <p>Loading...</p>
                    </div>
                )
                    :
                    (
                        <>  <div className='title  text-center text-white bg-dark'>
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
                                        {

                                            user?.username == article?.author?.username ?
                                                <>
                                                    <button className="btn btn-outline button-edit" onClick={() => { handleEditArticle() }}><span><AiFillEdit />Edit Article </span></button>
                                                    <button className="btn btn-outline button-delete"><span><AiFillDelete />Delete Article  </span></button>
                                                </>

                                                : <>
                                                    <button className="btn btn-outline button-Follow"><span><AiOutlinePlus />Follow Article {article.favoritesCount} </span></button>

                                                    <button className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                </>

                                        }

                                    </div>


                                </div>

                            </div>

                        </div>
                            <div className="body-Article-detail container my-5">
                                <div className="body-text-detail">
                                    <p>  {article.body}</p>
                                    {article.tagList.map((tag) => {
                                        return (
                                            <>

                                                <li className="tag-list-li ">{tag}</li>
                                            </>
                                        )

                                    })

                                    }
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

                            {/* form comments */}
                            {token ?
                                <form>
                                    <div className="comments-body1">
                                        <div className="input-container1 ">
                                            <div className="card-container row d-flex justify-content-center">
                                                <div className="comment-card  col-7 ">
                                                    <div className="card-body ">
                                                        <textarea value={newComment} onChange={(e) => { setNewComment(e.target.value) }} placeholder='Write a comment...' className="comment-area1" rows="5" ></textarea>
                                                        <div className="header-articles-content d-flex">
                                                            <img src={"https://qpet.vn/wp-content/uploads/2023/04/anh-meme-cho-meo-hai-huoc-24.jpg"} className="rounded-circle" alt="Cinque Terre" width="20" height="20" />
                                                            <button onClick={() => { PostComments() }} type='button' className="btn btn-success btn-sm" style={{ marginLeft: 940 }}>Post Comment</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                :
                                <p style={{ marginLeft: 392, marginTop: 40 }}><NavLink to={`/login`}>Sign in</NavLink> or <NavLink to={`/register`}>sign up</NavLink> to add comments on this article.</p>
                            }

                            <div className="comments-body  ">
                                <div className="input-container ">
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
                        </>

                    )
            }




        </div>



    );
};

export default ArticlesDetail;