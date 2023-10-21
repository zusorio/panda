import { useRef } from 'react'
import { panda } from '../styled-system/jsx'

const FunctionButton = panda('span', {
  base: { color: 'red.500' },
})
const LiteralButton = panda.button`
  background-color: #fff;
  border: 1px solid #000;
  color: #8d00ff;
  padding: 0.5rem 1rem;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`

function App() {
  const ref = useRef()
  return (
    <>
      <FunctionButton>FunctionButton</FunctionButton>
      <LiteralButton>LiteralButton</LiteralButton>
      <panda.main
        ref={(node) => {
          console.log(node)
          ref.current = node
        }}
        px="2"
        color="green.500"
      >
        main
      </panda.main>
    </>
  )
}

export default App
