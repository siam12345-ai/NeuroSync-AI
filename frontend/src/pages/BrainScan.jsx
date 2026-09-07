import { useEffect, useRef, useState } from "react";
import API from "../services/api";

function BrainScanner() {

    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState("");

    const [metrics, setMetrics] = useState({
        mouseMovements: 0,
        keyPresses: 0,
        totalInteractions: 0,
        activeSeconds: 0,
        idleSeconds: 0,
        focusScore: 0,
        activityState: "Ready"
    });

    const timerRef = useRef(null);
    const scanStartRef = useRef(null);
    const lastActivityRef = useRef(null);

    const mouseMovementsRef = useRef(0);
    const keyPressesRef = useRef(0);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleMouseMove = () => {
        mouseMovementsRef.current += 1;
        lastActivityRef.current = Date.now();
    };

    const handleKeyDown = () => {
        keyPressesRef.current += 1;
        lastActivityRef.current = Date.now();
    };

    const calculateAnalysis = () => {

        const now = Date.now();

        const scanDurationSeconds = Math.max(
            1,
            Math.round(
                (now - scanStartRef.current) / 1000
            )
        );

        const mouseMovements =
            mouseMovementsRef.current;

        const keyPresses =
            keyPressesRef.current;

        const totalInteractions =
            mouseMovements + keyPresses;

        const idleSeconds = Math.max(
            0,
            Math.round(
                (now - lastActivityRef.current) / 1000
            )
        );

        const activeSeconds = Math.max(
            0,
            scanDurationSeconds - idleSeconds
        );

        /*
         * Behavioral Interaction Model
         *
         * This is NOT EEG measurement.
         * It estimates cognitive activity from
         * keyboard and mouse interaction signals.
         */

        let focusScore = 50;

        if (totalInteractions >= 10) {
            focusScore += 10;
        }

        if (totalInteractions >= 25) {
            focusScore += 10;
        }

        if (totalInteractions >= 50) {
            focusScore += 10;
        }

        if (
            activeSeconds >=
            scanDurationSeconds * 0.6
        ) {
            focusScore += 10;
        }

        if (
            activeSeconds >=
            scanDurationSeconds * 0.8
        ) {
            focusScore += 5;
        }

        if (idleSeconds >= 5) {
            focusScore -= 5;
        }

        if (idleSeconds >= 10) {
            focusScore -= 10;
        }

        focusScore = Math.max(
            0,
            Math.min(100, focusScore)
        );

        let activityState = "Low Activity";

        if (focusScore >= 75) {

            activityState = "High Activity";

        } else if (focusScore >= 50) {

            activityState = "Moderate Activity";

        }

        return {
            mouseMovements,
            keyPresses,
            totalInteractions,
            activeSeconds,
            idleSeconds,
            focusScore,
            activityState
        };
    };

    const startScan = () => {

        if (scanning) return;

        if (!user?.email) {

            setResult(
                "User session not found. Please login again."
            );

            return;
        }

        setScanning(true);
        setProgress(0);
        setResult("");

        mouseMovementsRef.current = 0;
        keyPressesRef.current = 0;

        scanStartRef.current = Date.now();
        lastActivityRef.current = Date.now();

        setMetrics({
            mouseMovements: 0,
            keyPresses: 0,
            totalInteractions: 0,
            activeSeconds: 0,
            idleSeconds: 0,
            focusScore: 0,
            activityState: "Monitoring"
        });

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        let value = 0;

        timerRef.current = setInterval(
            async () => {

                value += 10;

                setProgress(value);

                const liveAnalysis =
                    calculateAnalysis();

                setMetrics(liveAnalysis);

                if (value >= 100) {

                    clearInterval(
                        timerRef.current
                    );

                    timerRef.current = null;

                    window.removeEventListener(
                        "mousemove",
                        handleMouseMove
                    );

                    window.removeEventListener(
                        "keydown",
                        handleKeyDown
                    );

                    const finalAnalysis =
                        calculateAnalysis();

                    const scanResult = `
Cognitive Activity Analysis Complete

Focus Score: ${finalAnalysis.focusScore}%
Activity State: ${finalAnalysis.activityState}

Mouse Movements: ${finalAnalysis.mouseMovements}
Keyboard Activity: ${finalAnalysis.keyPresses}
Total Interactions: ${finalAnalysis.totalInteractions}

Active Time: ${finalAnalysis.activeSeconds}s
Idle Time: ${finalAnalysis.idleSeconds}s

Data Source: Behavioral Interaction Signals
Analysis Type: Non-EEG Behavioral Cognitive Activity Estimation
                    `.trim();

                    setMetrics(finalAnalysis);
                    setResult(scanResult);
                    setScanning(false);

                  try {

    await API.post(
        "/scan/save",
        {
            result: scanResult,

            focusScore: finalAnalysis.focusScore,

            activityState:
                finalAnalysis.activityState,

            interactionCount:
                finalAnalysis.totalInteractions,

            sessionDuration:
                finalAnalysis.activeSeconds,

            dataSource:
                "Behavioral Interaction Signals"
        }
    );

} catch (error) {

    console.error(
        "Scan Save Error:",
        error.response?.data ||
        error.message
    );

}
                }

            },
            1000
        );
    };

    useEffect(() => {

        return () => {

            if (timerRef.current) {

                clearInterval(
                    timerRef.current
                );

            }

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, []);

    return (

        <div className="ai-panel">

            <h2>
                🧠 AI Brain Scanner
            </h2>

            <p>
                Behavioral Cognitive Activity Monitoring
            </p>

            <p>
                Input Sources:
                {" "}
                Mouse + Keyboard Activity
            </p>

            {scanning && (

                <div className="progress-container">

                    <div
                        className="progress-bar"
                        style={{
                            width: `${progress}%`
                        }}
                    ></div>

                </div>

            )}

            <h3>

                {scanning

                    ? `🔄 Monitoring... ${progress}%`

                    : result ||
                      "Ready For Cognitive Activity Scan"

                }

            </h3>

            {scanning && (

                <div>

                    <p>
                        🖱 Mouse Activity:
                        {" "}
                        <strong>
                            {metrics.mouseMovements}
                        </strong>
                    </p>

                    <p>
                        ⌨ Keyboard Activity:
                        {" "}
                        <strong>
                            {metrics.keyPresses}
                        </strong>
                    </p>

                    <p>
                        📊 Total Interactions:
                        {" "}
                        <strong>
                            {metrics.totalInteractions}
                        </strong>
                    </p>

                    <p>
                        🎯 Estimated Focus:
                        {" "}
                        <strong>
                            {metrics.focusScore}%
                        </strong>
                    </p>

                    <p>
                        🧠 Activity State:
                        {" "}
                        <strong>
                            {metrics.activityState}
                        </strong>
                    </p>

                </div>

            )}

            {!scanning && result && (

                <div>

                    <h3>
                        🎯 Focus Score:
                        {" "}
                        {metrics.focusScore}%
                    </h3>

                    <p>
                        🧠 Activity State:
                        {" "}
                        {metrics.activityState}
                    </p>

                    <p>
                        🖱 Mouse Movements:
                        {" "}
                        {metrics.mouseMovements}
                    </p>

                    <p>
                        ⌨ Keyboard Activity:
                        {" "}
                        {metrics.keyPresses}
                    </p>

                    <p>
                        📊 Total Interactions:
                        {" "}
                        {metrics.totalInteractions}
                    </p>

                    <p>
                        ⏱ Active Time:
                        {" "}
                        {metrics.activeSeconds}s
                    </p>

                    <p>
                        ⏸ Idle Time:
                        {" "}
                        {metrics.idleSeconds}s
                    </p>

                    <small>
                        Data Source:
                        {" "}
                        Behavioral Interaction Signals
                    </small>

                </div>

            )}

            <button
                onClick={startScan}
                disabled={scanning}
            >

                {scanning
                    ? "Monitoring..."
                    : "Start Brain Scan"
                }

            </button>

        </div>

    );
}

export default BrainScanner;