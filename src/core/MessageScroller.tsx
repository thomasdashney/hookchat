import React, { UIEvent, RefObject } from 'react'
import throttle from 'lodash/throttle'
import MessageContainer from '../components/MessageContainer'
import MessageList from './MessageList'
import { IMessage } from '../types'

const MSG_HEIGHT = 120

interface IMessageScrollerProps {
  loading: boolean
  loadMore: () => void
  data: IMessage[]
}

interface IMessageScrollerSnapshot {
  bottom: boolean
  to: number
}

class MessageScroller extends React.Component<IMessageScrollerProps> {
  listRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()

  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const list = this.listRef.current as HTMLDivElement
    list.scrollTop = list.scrollHeight
  }

  isFullyScrolled = () => {
    const list = this.listRef.current as HTMLDivElement
    return list.scrollHeight - list.scrollTop === list.clientHeight
  }

  checkScroll = (e: UIEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).scrollTop < 50 && !this.props.loading) {
      this.props.loadMore()
    }
  }

  handleScroll = (e: UIEvent<HTMLDivElement>) => {
    e.persist()
    throttle(this.checkScroll, 500)(e)
  }

  getSnapshotBeforeUpdate(
    prevProps: IMessageScrollerProps
  ): null | IMessageScrollerSnapshot {
    // Scroll to the bottom initially
    if (prevProps.data.length === 0 && this.props.data.length) {
      return { bottom: true, to: 0 }
    }

    if (prevProps.data.length < this.props.data.length) {
      // If at the bottom, stay there
      if (this.isFullyScrolled()) {
        return { bottom: true, to: 0 }
      }

      const list = this.listRef.current as HTMLDivElement

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

  componentDidUpdate(
    prevProps: IMessageScrollerProps,
    prevState: {},
    snapshot: null | IMessageScrollerSnapshot
  ) {
    if (snapshot !== null) {
      if (snapshot.bottom) {
        this.scrollToBottom()
      } else {
        const list = this.listRef.current as HTMLDivElement
        list.scrollTop = list.scrollHeight - snapshot.to
      }
    }
  }

  render() {
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
