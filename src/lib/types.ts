export type Message = {
  username: string
  msg: string
}
export type Room = {
  name: string
  chat: Message[]
}
export type Rooms = { /* readonly */ [roomtitle: string]: Room }
