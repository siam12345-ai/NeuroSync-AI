import "../App.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function History(){
    const [history, setHistory] = useState([]);

const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {

const fetchHistory = async () => {

try{

const res = await API.get(`/scan/${user.email}`);

setHistory(res.data);

}

catch(error){

console.log(error);

}

};

if(user){

fetchHistory();

}

},[]);


return(

<div className="dashboard">


<h1>
📜 Scan History
</h1>


<div className="history-panel">


{
history.length === 0 ? (

<p>

No Scan History Found

</p>

) : (

history.map((item)=>(

<div
key={item._id}
className="history-card"
>

<h3>

{item.result}

</h3>

<p>

📅 {new Date(item.createdAt).toLocaleString()}

</p>

</div>

))

)
}


</div>


</div>

)


}


export default History;