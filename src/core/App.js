import React from 'react'
import { UserProvider } from './UserContext'
import Chat from './Chat'

const App = () => {
  return (
    <UserProvider>
      <Chat />
    </UserProvider>
  )
}

export default App
