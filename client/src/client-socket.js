import socketIOClient from "socket.io-client";
import { post } from "./utilities";
// origin includes the protocol and port, and omits the port on https://*.onrender.com
// (hostname + ":" + port becomes "host:" when location.port is empty).
const endpoint = window.location.origin;
export const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});