import React, { useContext } from "react"
import InputContainer from "../InputContainer"
import Message from "../Message"
import { AppContext } from "../../hooks/Contexts"

const Content = () => {
  const { currentRoom } = useContext(AppContext)

  return (
    <div id="content">
      <div id="messages">
        {currentRoom?.chat.map((chat, idx) => {
          return <Message key={idx} {...chat} />
        })}
      </div>
      <InputContainer />
    </div>
  )
}

export default Content
