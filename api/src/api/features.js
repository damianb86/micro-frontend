import axios from 'axios';

export const requestFeatures = () => axios.get('/spapi/features');
