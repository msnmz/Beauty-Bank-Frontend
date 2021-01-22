import axios from 'axios';

export default class Request {

    async getData(path) {
        const token = 'token';
        const response = await axios.get(path, {
            headers: { token, },
        });

        return response?.data;
    }

    async postData(path, data) {
        const token = localStorage.getItem('token');
        const response = await axios.post(path, data, {
            headers: { token, },
        });
        return response?.data;
    }
}