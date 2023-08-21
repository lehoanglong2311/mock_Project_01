import axios from 'axios';
const getArticlesGlobal = (currentPage,token) => {
    return axios.get(`https://api.realworld.io/api//articles?limit=10&offset=${(currentPage - 1) * 10}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const getMyArticles = (currentPage,token,author) => {
    return axios.get(`https://api.realworld.io/api//articles?author=${author}&limit=10&offset=${(currentPage - 1) * 10}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const getPopularTagRender = (currentPage,token,tag) => {
    return axios.get(`https://api.realworld.io/api//articles?tag=${tag}&limit=10&offset=${(currentPage - 1) * 10}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const getFavoritesArticles = (currentPage,token,author) => {
    return axios.get(`https://api.realworld.io/api//articles?favorited=${author}&limit=10&offset=${(currentPage - 1) * 10}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}



const getPopularTags = () => {
    return axios.get(`https://api.realworld.io/api//tags`);


}
const getArticleDetail = (slugs) => {
    return axios.get(`https://api.realworld.io/api//articles/${slugs}`);

}
const postNewArticle = (token, data) => {
    return axios.post(`https://api.realworld.io/api//articles/`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const EditPutArticle = (token, data,slug) => {
    return axios.put(`https://api.realworld.io/api//articles/${slug}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const DeleteArticle = (token,slug) => {
    return axios.delete(`https://api.realworld.io/api//articles/${slug}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const Like = (token,slug,data) => {
    return axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`,data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const DeleteLike = (token,slug) => {
    return axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const getArticleFollow = (token, currentPageFollow) => {
    return axios.get(`https://api.realworld.io/api//articles/feed?limit=10&offset=${(currentPageFollow - 1) * 10}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
const getCurrentUser = (token) => {
    return axios.get(`https://api.realworld.io/api/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
export {Like,DeleteLike,getPopularTagRender,getFavoritesArticles,getMyArticles,DeleteArticle,EditPutArticle,getCurrentUser, postNewArticle, getArticleFollow, getArticleDetail, getArticlesGlobal, getPopularTags }