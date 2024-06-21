import { useState } from "react"
import { RxCross2 } from "react-icons/rx"

export default function AddNote({ onClick, IsHidden, addNotesToStorage }) {
    const [note, setNote] = useState({
        id: 0,
        left: 0,
        top: 0,
        note: ''
    })

    const [localNotes, setLocalNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : []
    })

    function handleAddNote(e) {
        setNote(prevNote => ({
            ...prevNote,
            note: e.target.value
        }))
    }

    function addNotesToStorage() {
        const newNote = {
            id: Date.now(),
            left: Math.min(Math.abs(Math.floor(Math.random() * screen.availWidth) - 200), screen.availWidth - 200),
            top: Math.min(Math.abs(Math.floor(Math.random() * screen.availHeight) - 150), screen.availHeight - 150),
            note: note.note
        }

        const updatedNotes = [...localNotes, newNote]
        setLocalNotes(updatedNotes)

        localStorage.setItem('notes', JSON.stringify(updatedNotes))

        // clear textarea
        setNote({
            id: 0,
            left: 0,
            top: 0,
            note: ''
        })

        IsHidden.setIsNotePad(!IsHidden.isNotePad)
        window.location.reload()
    }

    return (
        <section className={`backdrop-blur-md w-full min-h-screen flex justify-center items-center ${IsHidden.isNotePad ? 'hidden' : 'flex'}`}>
            <div>
                <div className="flex justify-end mb-4">
                    <RxCross2 onClick={onClick} className="text-white bg-black rounded cursor-pointer" />
                </div>
                <textarea
                    value={note.note}
                    onChange={handleAddNote}
                    rows={7}
                    className="border-2 p-5 min-w-64 rounded-md"
                    placeholder="Start Typing..." />
                <button onClick={addNotesToStorage} className="block bg-black text-white rounded-md font-semibold tracking-wide px-6 py-2 w-full">Add Note</button>
            </div>
        </section>
    )
}