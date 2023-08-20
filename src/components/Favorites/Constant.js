
import axios from "axios"

export const headers = {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
}

export const URL_API = 'https://api.realworld.io/api'

export const GET1ARTICLE = async (slug) => {
    return await axios.get(`${URL_API}/articles/${slug}`, {
        headers
    })
}

export const HANDLEFAVERITE = async (type, slug) => {
    if (type === 'POST') {
        return await axios.post(`${URL_API}/articles/${slug}/favorite`, {}, {
            headers
        })
    } else if (type === 'DELETE') {
        return await axios.delete(`${URL_API}/articles/${slug}/favorite`, {
            headers
        })
    } else {
        // LOG_ERROR_API('API_HANDLE_FAVERITE', 'Type: %s', type);
    }

}
