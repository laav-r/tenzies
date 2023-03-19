import { nanoid } from "nanoid";

function Die(props) {

    const customStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
      }

    return (
        <div className={`die-face face-${props.value.length}`} style={customStyle} onClick={props.holdDice}>
            {props.value.map(dot => <span key={nanoid()}>{dot}</span>)}
        </div>
    )
}

export default Die;

