import axios from 'axios';
const getArticlesGlobal = (currentPage) => {
    return axios.get(`https://api.realworld.io/api//articles?limit=10&offset=${(currentPage - 1) * 10}`);

}
const getPopularTags = () => {
    return axios.get(`https://api.realworld.io/api//tags`);


}
const getArticleDetail = (slugs) => {
    return axios.get(`https://api.realworld.io/api//articles/${slugs}`);

}
const getArticleFollow = (token,currentPageFollow) => {
    return axios.get(`https://api.realworld.io/api//articles/feed?limit=10&offset=${(currentPageFollow - 1) * 10}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
export { getArticleFollow, getArticleDetail, getArticlesGlobal, getPopularTags }