// src/socketService.js
import io from 'socket.io-client';
import { userService } from './user.service';

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()



function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = userService.getLoggedinUser()
            if (user) this.login(user._id)
        },

        sendObject(obj) {
            socket.emit('send-object', obj);
        },

        onObjectReceive(callback) {
            socket.on('receive-object', callback);
        },

        sendNotification(message) {
            socket.emit('send-notification', message);
        },

        onNotificationReceive(callback) {
            socket.on('notification', callback);
        },

        disconnect() {
            if (socket) {
                socket.disconnect();
            }
        }
    }
}

