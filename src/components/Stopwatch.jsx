"use client"

import { useStopwatch } from "react-timer-hook";

export const Stopwatch = () => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });
    return (
        <div className="text-center">
            <h3 className="text-xl my-2">Watch</h3>
            <div className="text-3xl">
                <span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <p>{isRunning ? "Running" : "Not running"}</p>
            <button className="underline mx-1" onClick={start}>Start</button>
            <button className="underline mx-1" onClick={pause}>Pause</button>
            <button className="underline mx-1" onClick={reset}>Reset</button>
        </div>
    );
};
