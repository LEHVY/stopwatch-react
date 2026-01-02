
import { useState, useEffect, useRef } from "react"


export default function Stopwatch() {
    const [hours, setHours] = useState("00")
    const [minutes, setMinutes] = useState("00")
    const [seconds, setSeconds] = useState(12)
    const [isRunning, setIsRunning] = useState(false)

    function Start() {
        setIsRunning(prev => !prev)
        setInterval(() => {
            setSeconds(second =>  second + 1)
        }, 1000);

    }
    function Stop() {

    }
    function Reset() {
        setHours("00")
        setMinutes("00")
        setSeconds("00")
    }
    return (
        <>
            <div className="container">
                <div className="timer">
                    <h1>{hours}:{minutes}:{seconds}</h1>
                </div>
                <div className="buttons">
                    <button className="startBtn fas fa-play" onClick={Start} >{isRunning ? "Pause" : "Start"}</button>
                    <button className="stopBtn fas fa-stop">Stop</button>
                    <button className="resetBtn fas fa-repeat" onClick={Reset}>Reset</button>
                </div>
            </div>
        </>
    )
}