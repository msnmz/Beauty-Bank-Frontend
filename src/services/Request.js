import axios from 'axios';

export default class Request {

    static async getData(path) {
        const token = 'token';
        const response = await axios.get(path, {
            headers: { token, },
        });

        return response?.data;
    }

    static async postData(path, data) {
        const response = await axios.post(path, data);
        return response?.data;
    }
}

