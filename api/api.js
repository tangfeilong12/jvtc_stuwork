const url = 'http://api.ncgame.cc/jvtc';
import Axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';


const xhr = Axios.create({
    timeout: 6000,
    baseURL: url,
    withCredentials: true
});

xhr.interceptors.response.use(async response => {
    const data = response.data;
    if (data.code !== 0 && data.result !== 200) {
        throw new Error(data && data.message || "未知错误");
    }

    if (data.token) {
        try {
            await AsyncStorage.setItem('token', data.token);
        } catch (e) {
            console.log(e)
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
        token = await AsyncStorage.getItem('token') || '';
    } catch (e) {
        console.log(e)
    }
    config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
    token && (config.headers.authorization = "Bearer " + token);

    return config;
},
    error => {
        return Promise.reject(error);
    });


export const login = async (loginName, loginPass = '') => {
    if (!/^[0-9]{9}$/.test(loginName) || !loginPass.length) {
        throw new Error("用户名密码不正确")
    }
    return await xhr.post(`/login`, {
        "loginName": loginName,
        "loginPwd": loginPass
    });
};


export const WorkInfo = async () => {
    return await xhr.get(`/WorkInfo`)
};

export const user_info = async () => {
    return await xhr.get(`/user_info`)
};

export const getStuActive = async () => {
    return await xhr.get(`/getStuActive`)
};

export const MyActionGetNum = async () => {
    return await xhr.get(`/MyActionGetNum`)
};

export const AppAction = async (id) => {
    return await xhr.post(`/AppAction`, `[{"id":${id}}]`)
};

export const StuEnlightenRoomScore = async () => {
    return await xhr.get(`/StuEnlightenRoomScore`)
};

export const Course = async ({
    loginCode,
    week,
    semester
}) => {
    return await xhr.post(`https://www.cccccc.online/jvtc/find_score/api/v1/course`, {
        loginCode,
        week: week.toString(),
        semester
    })
};

export const CourseWeek = async () => {
    return await xhr.get(`https://www.cccccc.online/jvtc/find_score/api/v1/course/week`)
};


export const UpdateV = async () => {
    return await Axios.get(`http://v.ncgame.cc/v.json`);
};
