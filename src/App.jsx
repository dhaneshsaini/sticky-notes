import { useState } from "react";
import ShowNote from "./components/ShowNote";
import AddButton from "./components/AddButton";
import AddNote from "./components/AddNote";

export default function App() {
  const [isNotePad, setIsNotePad] = useState(true)

  function closeNote() {
    setIsNotePad(!isNotePad)
  }

  return (
    <section>
      <div className="overflow-hidden">
        <ShowNote />
        <AddButton onClick={closeNote} />
        <AddNote IsHidden={{ isNotePad, setIsNotePad }} onClick={closeNote} />
      </div>
    </section>
  )
}
