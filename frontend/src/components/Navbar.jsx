import { Link } from "react-router-dom";


function Navbar(){


return(

<nav>


<Link to="/" style={{textDecoration:"none", color:"white"}}>

<h2>
🧠 NeuroSync AI
</h2>

</Link>



<div>


<Link to="/login">

<button>
Login
</button>

</Link>



<Link to="/register">

<button>
Register
</button>

</Link>



</div>


</nav>


)

}


export default Navbar; 