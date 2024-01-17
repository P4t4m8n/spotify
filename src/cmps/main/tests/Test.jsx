import React, { useEffect } from 'react'
import socketService from '../socketService'

export function Test () {

    useEffect(() => {
        // Listening for objects from the server
        socketService.onObjectReceive((obj) => {
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
            {/* Your component JSX */}
        </div>
    )
}

