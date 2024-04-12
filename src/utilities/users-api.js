import sendRequest from './send-request';
const BASE_URL = '/api/users';

export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

export function getPantry() {
    return sendRequest(`${BASE_URL}/pantry`, 'GET');
}

export function addToPantry(name, id) {
    return sendRequest(`${BASE_URL}/pantry`, 'POST', {
        name,
        id,
    });
}

export function removeFromPantry(ingredient) {
    return sendRequest(`${BASE_URL}/pantry`, 'DELETE', {
        ingredient
    });
}
