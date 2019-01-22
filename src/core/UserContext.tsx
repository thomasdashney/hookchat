import React, { Component, ReactNode } from 'react'
import keyBy from 'lodash/keyBy'
import { IUser } from '../types'
const API = process.env.REACT_APP_API

const INITIAL_USER_STATE = {
  dataReady: false,
  usersById: {},
  currentUser: null
}

export const UserContext = React.createContext<IUserProviderState>(
  INITIAL_USER_STATE
)

interface IUserProviderProps {
  children: ReactNode
}

export interface IUserProviderState {
  dataReady: boolean
  usersById: {
    [id: number]: IUser
  }
  currentUser: IUser | null
}

export class UserProvider extends Component<
  IUserProviderProps,
  IUserProviderState
> {
  state = INITIAL_USER_STATE

  async componentDidMount() {
    const [users, currentUser] = await Promise.all([
      this.fetchUsers(),
      this.fetchCurrentUser()
    ])

    this.setState({
      dataReady: true,
      usersById: keyBy<IUser>(users, 'id'),
      currentUser
    })
  }

  fetchUsers = async (): Promise<IUser[]> => {
    const response = await fetch(`${API}/users`)
    return response.json()
  }

  fetchCurrentUser = async (): Promise<IUser> => {
    const response = await fetch(`${API}/me`)
    return response.json()
  }

  render() {
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
