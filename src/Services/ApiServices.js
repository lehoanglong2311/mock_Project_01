import axios from 'axios';
const getArticlesGlobal = (currentPage,token) => {
    return axios.get(`https://api.realworld.io/api//articles?limit=10&offset=${(currentPage - 1) * 10}`,{
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
export {getCurrentUser, postNewArticle, getArticleFollow, getArticleDetail, getArticlesGlobal, getPopularTags }