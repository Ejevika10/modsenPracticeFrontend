import axios from "axios";
const API_URL = 'http://localhost:8080/api/users';

export async function getUser(storedToken) {
    return await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
}