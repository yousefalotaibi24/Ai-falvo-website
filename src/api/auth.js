import instance from "../api/instance";
import { setToken } from "./storage"

const register = async ({username, password, email, name}) => {
    const data = await instance.post(`http://localhost:8000/api/auth/register`, {username, password, email, name});
    setToken(data.token);
    console.log("register data", data)
    return data;
};
const login = async (userInfo) => {
    const data = await instance.post("http://localhost:8000/api/auth/login", userInfo);
    setToken(data.token);
    console.log("login data", data)
    return data;
};

const logout = async () => {
    localStorage.removeItem("token");
    return true;
};

export { register, login, logout };