import React from "react"
import type { Message as MessageProps } from "../../lib/types"
import { hashColor } from "../../lib/utils"

const Message = ({ username, msg }: MessageProps) => {
  return (
    <div className="message">
      <span className="username" style={{ color: hashColor(username) }}>
        {username}
      </span>
      <span className="text">{msg}</span>
    </div>
  )
}

export default Message
