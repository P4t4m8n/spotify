// src/socketService.js
import io from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:3000";

class SocketService {
    constructor() {
        this.socket = io(SOCKET_SERVER_URL);
    }

    sendObject(obj) {
        this.socket.emit('send-object', obj);
    }

    onObjectReceive(callback) {
        this.socket.on('receive-object', callback);
    }

    sendNotification(message) {
        this.socket.emit('send-notification', message);
    }

    onNotificationReceive(callback) {
        this.socket.on('notification', callback);
    }

    disconnect() {
        if(this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketService();
