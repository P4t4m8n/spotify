import React, { useState, useEffect, useRef } from 'react'

export function SortByModal({ isOpen, onClose, onSortOptionSelected }) {

    const modalRef = useRef()

    const [sortOptions, setSortOptions] = useState([
        { label: 'Alphabetical', value: 'name', checked: false },
        { label: 'Recents', value: 'CreatedAt', checked: false },

    ])

    const handleSortOptionSelected = (value, checked) => {
        const updatedOptions = sortOptions.map(option =>
            option.value === value ? { ...option, checked } : option
        )
        setSortOptions(updatedOptions)
    }

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!isOpen) return null


    return (

        <div className="sort-modal" ref={modalRef}>
            {sortOptions.map(option => (
                <div key={option.value} className="modal-item">
                    <input
                        type="checkbox"
                        id={option.value}
                        checked={option.checked}
                        onChange={(ev) => handleSortOptionSelected(option.value, ev.target.checked)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>

    )
}
