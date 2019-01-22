import styled from 'styled-components'

interface IInputProps {
  error: boolean
}

const Input = styled.input<IInputProps>`
  border: none;
  background-color: ${props => (props.error ? '#E74C3C' : 'white')};
  transition: all linear 0.1s;
  width: 100%;
  height: 35px;
  border-radius: 0px;
  font-size: 16px;
  box-sizing: border-box;
  padding: 5px;
`

export default Input
