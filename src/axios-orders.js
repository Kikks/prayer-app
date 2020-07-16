import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://christtribe-prayer-app.firebaseio.com/'
});

export default instance;