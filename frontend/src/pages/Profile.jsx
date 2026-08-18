import "../App.css";


function Profile(){


const user =
JSON.parse(localStorage.getItem("user"));



return(

<div className="dashboard">


<h1>
👤 Profile
</h1>


<div className="profile-card">


<h2>
User Information
</h2>


<p>
Name: {user?.name}
</p>


<p>
Email: {user?.email}
</p>


</div>


</div>

)


}


export default Profile;