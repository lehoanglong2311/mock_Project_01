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
const getFeed = (token) => {
    return axios.get(`https://api.realworld.io/api//articles/feed`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

}
export { getFeed, getArticleDetail, getArticlesGlobal, getPopularTags }