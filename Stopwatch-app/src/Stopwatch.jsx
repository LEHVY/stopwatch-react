
import { useState, useEffect, useRef, useSyncExternalStore } from "react"


export default function Stopwatch() {

    const [count, setCount] = useState(58)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(null);

    function Start() {
        setIsRunning(prev => !prev);
    }
    useEffect(() => {
        if (!isRunning) return;

        timerRef.current = setInterval(() => {

            setCount(s => {
                let newCount = s + 1;
                return newCount;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    useEffect(() => {
        setSeconds(s => count % 60);
        setMinutes(m => parseInt(count / 60) % 60);
        setHours(h => parseInt(count / 3600) % 24)
    }, [count])


    function Stop() {
        setIsRunning(false)

        setCount(0)

    }
    function Reset() {
        // String(setHours(0)).padStart(3, "0")
        // String(setMinutes(0)).padStart(3, "0")
        // String(seconds).padStart(3, "0")
        setCount(0)

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