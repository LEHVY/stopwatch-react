
import { useState, useEffect, useRef } from "react"


export default function Stopwatch() {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(null);

    function Start() {
        setIsRunning(prev => !prev);
    }
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setSeconds(s => s + 1);
                if (seconds === 60 && minutes === 60) {
                    setSeconds(0)
                    setMinutes(0)
                    setHours(currentHour => currentHour + 1)
                } else if (seconds === 60 && minutes < 60) {
                    setSeconds(0)
                    setMinutes(currentMinute => currentMinute + 1)

                }
            }, 1000);

        } else {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [isRunning]);


    function Stop() {
        setIsRunning(false)
        setHours(0);
        setMinutes(0);
        setSeconds(0);

    }
    function Reset() {
        // String(setHours(0)).padStart(3, "0")
        // String(setMinutes(0)).padStart(3, "0")
        // String(seconds).padStart(3, "0")
        setHours(0)
        setMinutes(0)
        setSeconds(0)
    }
    return (
        <>
            <div className="container">
                <div className="timer">
                    <h1>{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</h1>
                </div>
                <div className="buttons">
                    <button className="startBtn fas fa-play" onClick={Start} >{isRunning ? "Pause" : "Start"}</button>
                    <button className="stopBtn fas fa-stop" onClick={Stop}>Stop</button>
                    <button className="resetBtn fas fa-repeat" onClick={Reset}>Reset</button>
                </div>
            </div>
        </>
    )
}