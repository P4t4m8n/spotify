import React, { useEffect } from 'react'

export function Test({ song }) {

    useEffect(() => {
        // Listening for objects from the server
        Sock.onObjectReceive((obj) => {
            console.log('Received object:', obj)
            // Handle the received object here
        })

        // Listening for notifications from the server
        socketService.onNotificationReceive((message) => {
            console.log('Received notification:', message)
            // Handle the notification here
        })

        // Clean up on unmount
        return () => {
            socketService.disconnect()
        }
    }, [])

    const handleSendObject = (obj) => {
        socketService.sendObject(obj)
    }

    const handleSendNotification = (message) => {
        socketService.sendNotification(message)
    }

    // Your component's render logic here
    return (
        <div>
            <button onClick={() => handleSendObject(song)}></button>
        </div>
    )
}

