import axios, { InternalAxiosRequestConfig } from 'axios';
import handleError from './handleError';

const handleRequestHeader = (config: InternalAxiosRequestConfig<any>) => {
    return config;
};

const handleAuth = (config: InternalAxiosRequestConfig<any>) => {
    const token = '123';
    config.headers['Authorization'] = `Bearer ${
        localStorage.getItem('token') || token || ''
    }`;
    return config;
};

axios.interceptors.request.use(
    (config) => {
        config = handleRequestHeader(config);
        config = handleAuth(config);
        return config;
    },
    (err) => {
        handleError.handleGeneralError('-1', err);
        Promise.reject(err);
    },
);
