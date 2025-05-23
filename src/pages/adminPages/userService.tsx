import axios from 'axios';

const API_URL = 'http://your-api-url.com/api/users';

export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const deleteUser = async (userId: number) => {
    await axios.delete(`${API_URL}/${userId}`);
};