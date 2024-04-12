import sendRequest from './send-request';
const BASE_URL = '/api/ingredients/search';

export function search(searchQuery) {
    return sendRequest(`${BASE_URL}/${searchQuery}`, 'GET');
}
