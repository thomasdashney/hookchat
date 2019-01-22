import React from 'react'
import throttle from 'lodash/throttle'
import MessageContainer from '../components/MessageContainer'
import MessageList from './MessageList'

const MSG_HEIGHT = 120

class MessageScroller extends React.Component {
  listRef = React.createRef()

  componentDidMount () {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const list = this.listRef.current
    list.scrollTop = list.scrollHeight
  }

  isFullyScrolled = () => {
    const list = this.listRef.current
    return list.scrollHeight - list.scrollTop === list.clientHeight
  }

  checkScroll = e => {
    if (e.target.scrollTop < 50 && !this.props.loading) {
      this.props.loadMore()
    }
  }

  handleScroll = e => {
    e.persist()
    throttle(this.checkScroll, 500)(e)
  }

  getSnapshotBeforeUpdate (prevProps, prevState) {
    // Scroll to the bottom initially
    if (prevProps.data.length === 0 && this.props.data.length) {
      return { bottom: true }
    }

    if (prevProps.data.length < this.props.data.length) {
      // If at the bottom, stay there
      if (this.isFullyScrolled()) {
        return { bottom: true }
      }

      const list = this.listRef.current

      // If the message is being added to the bottom, account for
      // message height when changing scroll position
      if (
        prevProps.data[prevProps.data.length - 1] !==
        this.props.data[this.props.data.length - 1]
      ) {
        return {
          bottom: false,
          to: list.scrollHeight - list.scrollTop + MSG_HEIGHT
        }
      } else {
        return { bottom: false, to: list.scrollHeight - list.scrollTop }
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      if (snapshot.bottom) {
        this.scrollToBottom()
      } else {
        const list = this.listRef.current
        list.scrollTop = list.scrollHeight - snapshot.to
      }
    }
  }

  render () {
    const { data, loading } = this.props
    return (
      <MessageContainer ref={this.listRef} onScroll={this.handleScroll}>
        {loading && <div>Loading...</div>}
        <MessageList data={data} />
      </MessageContainer>
    )
  }
}

export default MessageScroller
