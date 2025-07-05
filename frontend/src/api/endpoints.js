import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';
const GET_TODOS = `${BASE_URL}todos/`;
const CREATE_TODO = `${BASE_URL}create/`;
const DELETE_TODO = `${BASE_URL}delete/`;
const UPDATE_TODO = `${BASE_URL}update/`;

export const get_todos = async () => {
    const response = await axios.get(GET_TODOS);
    return response.data;
}
export const create_todo =async (todo_name) => {
    const response = await axios.post(CREATE_TODO,
        {
            todo_name:todo_name
        }
    )
    return response.data
}
export const delete_todo = async (id) => {
    try {
        const response = await axios.delete(`${DELETE_TODO}${id}/`);  // Ensure you include a trailing slash
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error.response?.data || error.message);
        throw error;  // Re-throw the error to handle it in your component if needed
    }
};
export const update_todo = async (id, updateFields) => {
    try {
        const response = await axios.put(`${UPDATE_TODO}${id}/`, updateFields); // Ensure you include a trailing slash
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error.response?.data || error.message);
        throw error; // Re-throw the error for handling in the component
    }
};