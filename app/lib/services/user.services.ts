import axios from "axios";
const path = '@/db.json';
import * as jsonData from "@/db.json"
let fs: any;
if (typeof window === 'undefined') {
    // Running on the server side
    fs = require('fs');
}
export const getUser = async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/user");
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export const addUser = async (data: {
    name: string;
    username: string;
    password: string;
}) => {
    try {
        const { name, username, password } = data;

        // Make a request to the API route to add a new user
        const response = await axios.post('/api/user', { name, username, password });
        return response.data
    } catch (error) {
        console.error('Error adding user data:', error);
    }
};