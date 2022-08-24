import axios from 'axios';

const API = axios.create({ baseURL: '/api/users' });

export const logIn = (formData) => API.post('/zain/login', formData);

export const signUp = (formData) => API.post('/zain/register', formData);
