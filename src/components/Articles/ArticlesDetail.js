import { useNavigate, Outlet, NavLink, useParams, redirect } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { MdOutlineFavorite } from 'react-icons/md'
import { AiOutlinePlus, AiFillDelete, AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import './ArticlesDetail.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { DeleteArticle, getArticleDetail, getCurrentUser, } from '../../Services/ApiServices';
import axios from 'axios';
import { UserContext } from '../../App';
import { BsFillTrash3Fill } from 'react-icons/bs'

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
    const handleDeleteArticle = async () => {
        const res = await DeleteArticle(token, slug)
        console.log("delete", res);
        navigate('/')
    }

    const handleDeleteComment = async (idCmt) => {
        try {
            console.log("idCmt", idCmt);
            const res = await axios.delete(`https://api.realworld.io/api//articles/${slug}/comments/${idCmt}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("delete", res);
            if (res.status === 200) {
                //cập nhật lại mảng cmt khi duyệt tất cả các cmt có id != idCmt bị xóa
                setComments(comments.filter(comment => comment.id !== idCmt));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleTrueFalseFavorites = async (slug, favorited) => {
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
                const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, null, {
                    headers: {
                        'Authorization': `Bearer ${token ? token : ""}`
                    }
                });

                console.log("like", res);
            }
            // Toggle the follow status

            const updatedArticle = {
                ...article,
                favorited: !favorited,
                favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1
            };

            setArticle(updatedArticle);
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
                                                    <button className="btn btn-outline button-delete" onClick={() => { handleDeleteArticle() }}><span><AiFillDelete />Delete Article  </span></button>
                                                </>

                                                : <>
                                                    {article.favorited ?
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug, article.favorited)} className="btn btn-success"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                        :
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug, article.favorited)} className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                    }



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

                                        {

                                            user?.username == article?.author?.username ?
                                                <>
                                                    <button className="btn btn-outline button-edit" onClick={() => { handleEditArticle() }}><span><AiFillEdit />Edit Article </span></button>
                                                    <button className="btn btn-outline button-delete" onClick={() => { handleDeleteArticle() }}><span><AiFillDelete />Delete Article  </span></button>
                                                </>

                                                : <>
                                                    {article.favorited ?
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug, article.favorited)} className="btn btn-success"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                        :
                                                        <button onClick={() => handleTrueFalseFavorites(article.slug, article.favorited)} className="btn btn-outline button-tym"><span><MdOutlineFavorite />Favorites Article {article.favoritesCount} </span></button>
                                                    }



                                                </>

                                        }
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
                                                            <button onClick={() => { PostComments() }} type='button' className="btn btn-success btn-sm" style={{ marginLeft: 720 }}>Post Comment</button>
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
                                                                {
                                                                    user?.username == comment?.author?.username ?
                                                                        <button onClick={() => { handleDeleteComment(comment.id) } } style={{ marginLeft: 800 }} className='btn btn-sm'><BsFillTrash3Fill></BsFillTrash3Fill></button>
                                                                        : ""}
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