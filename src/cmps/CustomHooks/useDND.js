import { useState } from 'react'

function useDragAndDrop() {
    const [draggedItem, setDraggedItem] = useState(null)

    const handleDragStart = (item) => {
        setDraggedItem(item)
    }

    const handleDragOver = (e) => {
        e.preventDefault() // Necessary to allow dropping
    }

    const handleDrop = (ev) => {
        ev.preventDefault()
        if (draggedItem) {
            handleItemDropped(draggedItem)
            setDraggedItem(null) // Reset the dragged item
        }
    }

    const handleItemDropped = (item) => {
        console.log("Item dropped:", item);
        // Implement the logic after an item is dropped
    }

    return { handleDragStart, handleDragOver, handleDrop, handleItemDropped }
}
