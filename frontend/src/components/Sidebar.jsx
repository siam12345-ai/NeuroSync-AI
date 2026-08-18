import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";


function Sidebar(){
const [open, setOpen] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {

const handleResize = () => {

if(window.innerWidth > 900){

setOpen(false);

}

};

window.addEventListener("resize", handleResize);

return () => window.removeEventListener("resize", handleResize);

}, []);


const menu = [

{
name:"Dashboard",
icon:"🏠",
path:"/dashboard"
},

{
name:"Brain Scan",
icon:"🧠",
path:"/scan"
},

{
name:"Analytics",
icon:"📊",
path:"/analytics"
},

{
name:"History",
icon:"📜",
path:"/history"
},

{
name:"Profile",
icon:"👤",
path:"/profile"
}

];



return(

<>

<button
className="menu-toggle"
onClick={() => setOpen(!open)}
>

☰

</button>
{

open &&

<div
className="sidebar-overlay"
onClick={() => setOpen(false)}
></div>

}

<div className={open ? "sidebar open" : "sidebar"}>


<h2>
🧠 NeuroSync AI
</h2>
<div className="sidebar-user">

<div className="avatar">

👤

</div>

<div>

<h4>{user?.name}</h4>

<p>{user?.email}</p>

<div className="online-status">

🟢 Online

</div>

</div>

</div>



<div className="menu">


{

menu.map((item)=>(


<NavLink
  key={item.path}
  to={item.path}
  onClick={() => setOpen(false)}
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  <span className="menu-icon">
    {item.icon}
  </span>

  <span className="menu-text">
    {item.name}
  </span>

</NavLink>

))

}


</div>





<div className="side-bottom">


<button disabled>

⚙ Settings

</button>


<button
className="side-logout"
onClick={()=>{
localStorage.removeItem("user");
window.location.href="/";
}}
>

🚪 Logout

</button>


</div>




</div>

</>

)

}


export default Sidebar;