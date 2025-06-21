export default function Pad(props) {

  // Step 3: When user clicks, this function runs
  function handleClick() {
    // Step 4: Calls toggle function from App and passes its own id
    props.toggle(props.id)
  }

  return (
    <button
      onClick={handleClick}
      className={props.on ? "on" : undefined}
      style={{ backgroundColor: props.color }}
    >
    </button>
  )
}
