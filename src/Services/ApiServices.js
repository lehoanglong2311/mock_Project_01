import axios from 'axios';
const getArticlesGlobal = () =>{
    return  axios.get('https://api.realworld.io/api//articles?limit=10&offset=0')

}

export{getArticlesGlobal}