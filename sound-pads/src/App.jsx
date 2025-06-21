import React from "react"
import pads from "/src/pads.js"
import Pad from "/src/components/Pad"

export default function App() {

  // Step 1: App defines the toggle(id) function
  function toggle(id) {
    // Step 5: Updates padData by toggling the 'on' value of the pad with matching id
    setPadData(prevPadData =>
      prevPadData.map(pad =>
        pad.id === id
          ? { ...pad, on: !pad.on }
          : pad
      )
    )
  }

  // Holds the current state of all pads
  const [padData, setPadData] = React.useState(pads)

  // Step 2: toggle is passed to each Pad component as a prop
  const buttonElements = padData.map(pad => (
    <Pad
      key={pad.id}
      id={pad.id}
      color={pad.color}
      on={pad.on}
      toggle={toggle}
    />
  ))

  // Step 6: React re-renders when padData changes
  return (
    <main>
      <div className="pad-container">
        {buttonElements}
      </div>
    </main>
  )
}
