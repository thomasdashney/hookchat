import React, { Component } from 'react'
import keyBy from 'lodash/keyBy'
const API = process.env.REACT_APP_API

export const UserContext = React.createContext()

export class UserProvider extends Component {
  state = {
    dataReady: false,
    usersById: {},
    currentUser: {}
  }

  async componentDidMount () {
    const [users, currentUser] = await Promise.all([
      this.fetchUsers(),
      this.fetchCurrentUser()
    ])
    this.setState({
      dataReady: true,
      usersById: keyBy(users, 'id'),
      currentUser
    })
  }

  fetchUsers = async () => {
    const response = await fetch(`${API}/users`)
    return response.json()
  }

  fetchCurrentUser = async () => {
    const response = await fetch(`${API}/me`)
    return response.json()
  }

  render () {
    if (!this.state.dataReady) {
      return 'Loading users...'
    }
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
