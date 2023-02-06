import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react"
import type { Room, Rooms } from "../lib/types"

export const initialRooms: Rooms = {
  lobby: {
    name: "lobby",
    chat: [
      {
        username: "Rocket",
        msg: "Hey! Open another browser tab, send a message.",
      },
    ],
  },
  rocket: {
    name: "rocket",
    chat: [
      {
        username: "Rocket",
        msg: "This is another room. Neat, huh?",
      },
    ],
  },
}

export interface AppInterface {
  currentRoom: Room | null
  rooms: RefObject<Rooms[]>
  connected: boolean
  addRoom: (name: string) => void
  setRoom: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppInterface>({
  currentRoom: initialRooms.lobby,
  rooms: { current: [initialRooms] },
  connected: false,
  addRoom: () => {},
  setRoom: () => {},
})
