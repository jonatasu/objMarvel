import md5 from 'md5';

export const API_BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
export const API_TS = '1';
export const API_KEY = '87a638d8847a8736599145b54bc4cf19';
export const API_PRIVATE_KEY = 'd996b8fed010e5090a835ef077789ce31bd9cf53';
export const API_HASH = md5(`${API_TS}${API_PRIVATE_KEY}${API_KEY}`);
