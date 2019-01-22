import React, { FunctionComponent } from 'react'
import { UserProvider } from './UserContext'
import Chat from './Chat'

const App: FunctionComponent = () => {
  return (
    <UserProvider>
      <Chat />
    </UserProvider>
  )
}

export default App
