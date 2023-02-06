import React, { FormEvent, useContext, useRef } from "react"
import { AppContext } from "../../hooks/Contexts"

type Props = {}

const InputContainer = (props: Props) => {
  const { currentRoom, connected } = useContext(AppContext)
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = usernameInputRef.current!.value || "guest"
    const message = messageInputRef.current!.value
    if (!message || !username) return

    if (connected) {
      const response = await fetch("http://127.0.0.1:8000/message", {
        method: "POST",
        body: new URLSearchParams({
          room: currentRoom!.name,
          username,
          message,
        }),
      })

      if (response.ok) messageInputRef.current!.value = ""
    }
  }

  return (
    <>
      <form id="new-message" onSubmit={onSubmit}>
        <input
          ref={usernameInputRef}
          type="text"
          name="username"
          id="username"
          maxLength={19}
          placeholder="guest"
          autoComplete="off"
        />
        <input
          ref={messageInputRef}
          type="text"
          name="message"
          id="message"
          autoComplete="off"
          placeholder="Send a message..."
          autoFocus
        />
        <button type="submit" id="send">
          Send
        </button>
      </form>
    </>
  )
}

export default InputContainer
