import React, { FormEvent, useContext, useRef } from "react"
import { AppContext } from "../../hooks/Contexts"

type Props = {}

const Sidebar = (props: Props) => {
  const { currentRoom, rooms, setRoom, addRoom } = useContext(AppContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const keys = Object.keys(rooms.current![0])
  console.log(keys)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(`value : ${inputRef.current}`)
    addRoom(inputRef.current!.value)
  }

  return (
    <div id="sidebar">
      <div id="status" className="pending"></div>

      <div id="room-list">
        {keys.map((room) => {
          const name = rooms.current![0][room].name
          return (
            <button
              className={`room ${currentRoom?.name === name ? "active" : ""}`}
              key={name}
              onClick={() => setRoom(name)}
            >
              {name}
            </button>
          )
        })}
      </div>
      <form id="new-room" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          placeholder="new room..."
          maxLength={29}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  )
}

export default Sidebar
