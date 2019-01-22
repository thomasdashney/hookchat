import React from 'react'
import { UserContext } from './UserContext'
import Message from '../components/Message'

const MessageList = props => {
  return (
    <UserContext.Consumer>
      {({ usersById }) => {
        return props.data.map((msg, i) => (
          <Message
            key={i}
            avatar={usersById[msg.userId].avatar}
            username={usersById[msg.userId].username}
            {...msg}
          />
        ))
      }}
    </UserContext.Consumer>
  )
}

export default MessageList
