import React, { useEffect, useMemo, useRef, useState } from "react"
import { Content, Sidebar } from "./components"
import { AppContext, initialRooms } from "./hooks/Contexts"
import "./App.css"
import { server_uri } from "./lib/constants"
import type { Rooms } from "./lib/types"

function App() {
  const [room, setRoom] = useState<string>("lobby")
  const [connected, setConnected] = useState(false)
  const [_, setRenderingCycle] = useState(0)
  const rooms = useRef<Rooms[]>([initialRooms])

  const addRoom = (name: string) => {
    if (rooms.current[0][name]) {
      setRoom(name)
      return false
    }
    rooms.current[0][name] = {
      name: name,
      chat: [],
    }
    setRoom(name)
    return true
  }

  // init
  useEffect(() => {
    let retryTime = 1

    function addMessage(
      roomname: string,
      username: string,
      msg: string,
      push = false
    ) {
      if (!rooms.current[0][roomname]) {
        console.warn(`Room name ${roomname} undetected.`)
        return
      }
      if (push) {
        rooms.current[0][roomname].chat.push({ username, msg })
      }
      setRenderingCycle(Math.random())
    }
    // Subscribe to the event source at `uri` with exponential backoff reconnect.
    let events: EventSource | null = null
    let onMessage = (ev: MessageEvent<any>) => {
      console.log("raw data", JSON.stringify(ev.data))
      console.log("decoded data", JSON.stringify(JSON.parse(ev.data)))
      const msg = JSON.parse(ev.data)
      if (!("message" in msg) || !("room" in msg) || !("username" in msg))
        return
      addMessage(msg.room, msg.username, msg.message, true)
    }
    let onOpen = () => {
      setConnected(true)
      console.log(`connected to event stream at ${server_uri}`)
      retryTime = 1
    }
    let onError = () => {
      setConnected(false)
      if (events) events.close()
      let timeout = retryTime
      retryTime = Math.min(64, retryTime * 2)
      console.log(`connection lost. attempting to reconnect in ${timeout}s`)
      setTimeout(() => connect(server_uri), (() => timeout * 1000)())
    }
    function connect(uri: string) {
      events = new EventSource(uri)
      events.addEventListener("message", onMessage)
      events.addEventListener("open", onOpen)
      events.addEventListener("error", onError)
    }

    connect(server_uri)
    return () => {
      if (events) {
        events.removeEventListener("message", onMessage)
        events.removeEventListener("open", onOpen)
        events.removeEventListener("error", onError)
        events.close()
      }
    }
  }, [])

  const currentRoom = useMemo(() => {
    if (rooms.current[0][room]) return rooms.current[0][room]
    return null
  }, [_, room, connected])

  console.log(currentRoom)

  return (
    <main>
      <AppContext.Provider
        value={{
          currentRoom,
          rooms,
          connected,
          addRoom,
          setRoom
        }}
      >
        <Sidebar />
        <Content />
      </AppContext.Provider>
    </main>
  )
}

export default App
