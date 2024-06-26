import { useState } from "react"
import { RxCheck, RxCross1 } from "react-icons/rx"

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
        if (note.note) {
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
    }

    return (
        <section className={`w-full z-50 bg-zinc-800/30 min-h-screen flex justify-center items-center ${IsHidden.isNotePad ? 'hidden' : 'flex'}`}>
            <div className="">
                <div className="flex gap-3 justify-end rounded-md mb-3 p-4 bg-white">
                    <RxCross1 onClick={onClick} className="text-white bg-zinc-800 rounded-full cursor-pointer p-1 hover:bg-red-500" />
                    <RxCheck onClick={addNotesToStorage} className="text-white bg-zinc-800 rounded-full cursor-pointer p-1 hover:bg-green-500" />
                </div>
                <textarea
                    value={note.note}
                    onChange={handleAddNote}
                    rows={7}
                    className="p-5 outline-none min-w-64 rounded-md"
                    placeholder="Start Typing..." />
            </div>
        </section>
    )
}