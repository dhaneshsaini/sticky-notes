import React, { useEffect, useRef, useState } from "react"

export default function ShowNote({ addNotesToStorage }) {
    const dragItem = useRef(null)

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : []
    })

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes, addNotesToStorage])

    function handleDragEnd(e, id) {
        if (!dragItem.current) return

        const rect = dragItem.current.getBoundingClientRect()
        let x = e.clientX - rect.width / 2
        let y = e.clientY - rect.height / 2

        // Collision detection with other notes
        const collides = notes.some(item => {
            if (item.id !== id) {
                const itemRect = {
                    left: item.left,
                    top: item.top,
                    right: item.left + rect.width,
                    bottom: item.top + rect.height
                }

                if (
                    x < itemRect.right &&
                    x + rect.width > itemRect.left &&
                    y < itemRect.bottom &&
                    y + rect.height > itemRect.top
                ) {
                    // Collision detected, move to original position
                    return true
                }
            }
            return false
        })

        if (collides) {
            // Move to original position
            x = notes.find(item => item.id === id).left
            y = notes.find(item => item.id === id).top
        } else {
            // Ensure position within viewport
            if (x < 0) x = 0
            if (y < 0) y = 0
            if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width
            if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height
        }

        const newList = notes.map(item => {
            if (item.id === id) {
                return { ...item, left: x, top: y }
            }
            return item
        })

        setNotes(newList)
    }

    return (
        <React.Fragment>
            {notes.map((item, i) => (
                <div
                    key={i}
                    style={{ left: item.left, top: item.top, position: 'absolute' }}
                    id={item.id}
                    ref={el => (dragItem.current = el)}
                    onDragEnd={(e) => handleDragEnd(e, item.id)}
                    draggable
                    className="max-w-56 p-3 cursor-grab active:cursor-grabbing select-none bg-rose-100 rounded">
                    <p><span role="img" aria-label="pin">📌</span> {item.note}</p>
                </div>
            ))}
        </React.Fragment>
    )
}
