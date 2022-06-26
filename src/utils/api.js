import axios from 'axios'

const config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const $api = axios.create(config)


export default $api