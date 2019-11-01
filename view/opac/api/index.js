const url = 'http://192.168.1.150:6722';
import Axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';


const xhr = Axios.create({
    timeout: 4000,
    baseURL: url,
    withCredentials: true
});


xhr.interceptors.response.use(async response => {
    const data = response.data;
    if (data.code !== 200) {
        throw new Error(data && data.message || "未知错误");
    }
    if (data.data) {
        try {
            if (data.data.token) {
                await AsyncStorage.setItem('opac_token', data.data.token);
            }
        } catch (e) {
            console.warn(e, e.message)
        }
    }

    return data;
},
    error => {
        return Promise.reject(error);
    });

xhr.interceptors.request.use(async config => {
    let token = '';
    try {
        token = await AsyncStorage.getItem('opac_token') || '';
    } catch (e) {
        console.log(e)
    }
    config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
    token && (config.headers.authorization = "Bearer " + token);

    return config;
},
    error => {
        return Promise.reject(error)
    });


export const login = async (username, password, code, key) => {
    return await xhr.post(`/login`, {
        username,
        password,
        code,
        key
    });
};

export const getCode = async () => {
    return await xhr.get(`/login/code`);
};

export const search = (keyword) => {
    return xhr.get(`/public/search?keyword=${keyword}`);
};

export const getDetail = (id) => {
    return xhr.get(`public/search/detail?id=${id}`);
};

export const getBookList = () => {
    return xhr.get(`info/book_list`);
};

export const getBookHist = () => {
    return xhr.get(`info/book_hist`);
};

export const renew = (data) => {
    return xhr.post(`renew`, data);
};