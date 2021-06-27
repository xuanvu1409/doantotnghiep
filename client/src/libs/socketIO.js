import io from "socket.io-client";
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
export const socket = io(process.env.REACT_APP_DOMAIN_SOCKET, {
    query: {token}
});