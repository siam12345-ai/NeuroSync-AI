
import { useState } from "react";
import API from "../services/api";

function BrainScanner() {

const [scanning, setScanning] = useState(false);

const [progress, setProgress] = useState(0);

const [result, setResult] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
const startScan = async () => {

if(scanning) return;

setScanning(true);

setProgress(0);

setResult("");

let value = 0;

const timer = setInterval(async () => {

value += 10;

setProgress(value);

if(value >= 100){

clearInterval(timer);

setScanning(false);
const scanResult = "🧠 Brain Analysis Complete ✅";

setResult(scanResult);

try{

await API.post("/scan/save",{

userEmail:user.email,

result:scanResult

});

}catch(error){

console.log(error);

}
}

},300);

};

return(

<div className="ai-panel">

<h2>AI Brain Scanner</h2>

<p>Real-time brain frequency analysis system</p>

{
scanning &&

<div className="progress-container">

<div
className="progress-bar"
style={{width:`${progress}%`}}
></div>

</div>

}

<h3>

{

scanning

?

`Scanning... ${progress}%`

:

result || "Ready For Brain Scan"

}

</h3>

<button onClick={startScan}>

{

scanning

?

"Scanning..."

:

"Start Scan"

}

</button>

</div>

);

}

export default BrainScanner;