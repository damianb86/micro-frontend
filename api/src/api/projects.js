import axios from 'axios';

export const requestProjects = () => axios.get('/spapi/projects');
