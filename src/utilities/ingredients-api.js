import sendRequest from './send-request';
const BASE_URL = '/api/ingredients/search';

export async function search(searchQuery) {
    const results = await sendRequest(`${BASE_URL}/${searchQuery}`, 'GET');
    return results;
}
