import axios from "axios"
import type {UserCreationInterface} from "../models/user-models/userCreationInterface.ts"


const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData: UserCreationInterface) => {
    const signupUrl = `${API_URL}/signup`;
    return axios.post(signupUrl, userData);
};

export const logout = async () => {

    const logoutUrl = `${API_URL}/logout`
    return axios.post(logoutUrl, {}, { withCredentials: true });
}

export const login = (credentials: { email: string; password: string }) => {
    const loginEndpoint = `${API_URL}/login`;
    return axios.post(loginEndpoint, credentials,
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true,
        });
};


