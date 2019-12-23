import axios from "./axios"

export const getVideosDownloadUrls = (url) => {

    return axios.post('/api/getDownloadUrls', {
        url
    })
}