import axios from 'axios';
import { ADDTASK, DELETETASK, GETALLTASK, LOGIN, MARKREADTASK, REGISTER } from './apiConstants';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.error('Response Error:', {
            message: error.message,
            response: error.response,
            request: error.request,
            config: error.config
        });
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    try {
        console.log('Attempting to login with URL:', LOGIN);
        const response = await axios.post(LOGIN, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Login response:', response);
        return response;
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            response: error.response,
            request: error.request,
            config: error.config
        });
        throw error;
    }
}

export const register = (data) => {
    return axios.post(REGISTER, data);
}
export const addtask = (data) => {
    let token = getToken();
    console.log("token", token);
    return axios.post(ADDTASK, data, {
        headers: {
            auth: token
        }
    });
}

export const getTaskList = (data) => {
    let token = getToken();
    return axios.get(GETALLTASK, {
        headers: {
            auth: token
        }
    });
}
export const deleteTask = (data) => {
    let token = getToken();

    return axios.post(DELETETASK, data, {
        headers: {
            auth: token
        }
    });
}

export const markReadTask = (data) => {
    let token = getToken();

    return axios.post(MARKREADTASK, data, {
        headers: {
            auth: token
        }
    });
}


export function getToken() {
    let user = localStorage.getItem('user');
    if (!user) return;
    const userObj = JSON.parse(user);
    return userObj.token;
}




