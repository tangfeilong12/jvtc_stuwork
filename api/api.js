// const url = 'http://192.168.10.107:3214';
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
    if (data.code !== 0 && data.result !== 200 && data.code !== 200) {
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
    // console.warn(config);
    "".includes
    const isP = config.url.includes('?');
    if (isP) {
        config.url += '&rn=1';
    } else {
        config.url += '?rn=1';
    }

    return config;
},
    error => {
        return Promise.reject(error);
    });


export const login = async (loginName, loginPass = '') => {
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

export const stu_judge_score = async (TermTime) => {
    return await xhr.get(`/stu_judge_score`, {
        params: {
            TermTime
        }
    })
};

export const announcement = async () => {
    return await xhr.get(`/announcement`)
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

export const eggs = async (stuNo, type) => {
    return await xhr.get(`/eggs?stuNo=${stuNo}&type=${type}`);
};

export const getData = async () => {
    return await xhr.get(`/data`);
};
export const sendMsg = async (msg, stuNo) => {
    return await xhr.post(`/msg`, { msg, stuNo })
};

export const Course = async ({
    loginCode,
    week
}) => {
    return await xhr.get(`https://jvtc.notbucai.com/jwxt/course?week=${week}&loginCode=${loginCode}`)
};

export const CourseWeek = async () => {
    return await xhr.get(`https://jvtc.notbucai.com/jwxt/course/week`)
};


export const Cjcx = async (data) => {
    console.warn(data);
    return await xhr.post(`https://jvtc.notbucai.com/jwxt/cjcx`, { ...data })
};

export const UpdateV = async () => {
    return await Axios.get(`http://v.ncgame.cc/v.json`);
};
