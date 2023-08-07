import axios from 'axios';
const getArticlesGlobal = (currentPage) =>{
    return  axios.get(`https://api.realworld.io/api//articles?limit=10&offset=${(currentPage - 1) * 10}`);

}

export{getArticlesGlobal}