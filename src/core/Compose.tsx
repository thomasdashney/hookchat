import React, { Component, KeyboardEvent, ChangeEvent } from 'react'
import validate from '../helpers/validate'
import Input from '../components/Input'

interface IComposeProps {
  onMessage: (message: string) => void
}

interface IComposeState {
  text: string
  error: boolean
}

class Compose extends Component<IComposeProps, IComposeState> {
  state = {
    text: '',
    error: false
  }

  inputEl = React.createRef<HTMLInputElement>()

  componentDidMount() {
    if (this.inputEl.current) {
      this.inputEl.current.focus()
    }
  }

  onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (this.state.error || this.state.text === '') return
    if (e.key === 'Enter') {
      this.props.onMessage(this.state.text)
      this.setState({ text: '' })
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    this.setState({ text, error: validate(text) })
  }

  render() {
    const { error, text } = this.state
    return (
      <Input
        ref={this.inputEl}
        placeholder="Talk talk..."
        error={error}
        value={text}
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
      />
    )
  }
}

export default Compose
