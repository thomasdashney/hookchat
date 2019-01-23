import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import { IMessage } from '../types'

const Username = styled.span`
  font-weight: 900;
`

const Date = styled.span`
  margin-left: 5px;
`

const Container = styled.div`
  display: flex;
  margin: 20px 0;
`

const Content = styled.div`
  margin-left: 15px;
`

interface IMessageProps extends IMessage {
  avatar: string
  username: string
}

const Message: FunctionComponent<IMessageProps> = ({
  time,
  text,
  avatar,
  username
}) => {
  return (
    <Container>
      <Avatar src={avatar} />
      <Content>
        <Username>{username}</Username>
        <Date>{time.toString()}</Date>
        <div>{text}</div>
      </Content>
    </Container>
  )
}

export default React.memo(Message)
