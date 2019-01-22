import React, { FunctionComponent } from 'react'
import { UserContext } from './UserContext'
import Message from '../components/Message'
import { IMessage } from '../types'

interface IMessageListProps {
  data: IMessage[]
}

const MessageList: FunctionComponent<IMessageListProps> = props => {
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
