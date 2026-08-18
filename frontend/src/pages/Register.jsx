
import "../App.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";


function Register(){
const navigate = useNavigate();


const [form, setForm] = useState({
    

name:"",
email:"",
password:"",
confirmPassword:""

});
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);






const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});


};




const handleSubmit=async(e)=>{

e.preventDefault();



if (
  !form.name.trim() ||
  !form.email.trim() ||
  !form.password.trim() ||
  !form.confirmPassword.trim()
) {
  alert("Please fill all fields");
  return;
}
if (!form.name.trim()) {
  alert("Full Name is required");
  return;
}

if (!form.email.trim()) {
  alert("Email is required");
  return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(form.email)) {
  alert("Please enter a valid email address");
  return;
}

if (!form.password.trim()) {
  alert("Password is required");
  return;
}

if (form.password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

if (form.password !== form.confirmPassword) {
  alert("Passwords do not match");
  return;
}

try{

setLoading(true);

const res = await API.post("/auth/register",form);

alert(res.data.message);
setTimeout(() => {

navigate("/login");

}, 2000);

}

catch(error){

alert(error.response?.data?.message || "Registration Failed");

}

finally{

setLoading(false);


}


};



return(


<div className="auth-container">


<div className="auth-card">

<div className="auth-header">

<h1 className="logo">
🧠 NeuroSync AI
</h1>

<p className="subtitle">
Intelligent Cognitive Learning Platform
</p>

<h2>
Create Account
</h2>

<p className="login-text">
Create your account to start your learning journey.
</p>

</div>





<form onSubmit={handleSubmit}>


<div className="form-group">

<label>
Full Name
</label>

<input
type="text"
name="name"
placeholder="Enter your full name"
value={form.name}
onChange={handleChange}
/>

</div>



<div className="form-group">

<label>
Email Address
</label>

<input
type="email"
name="email"
placeholder="Enter your email"
value={form.email}
onChange={handleChange}
/>

</div>



<div className="form-group">

<label>
Password
</label>

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Enter your password"
value={form.password}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>
Confirm Password
</label>

<input
type={showPassword ? "text" : "password"}
name="confirmPassword"
placeholder="Confirm your password"
value={form.confirmPassword}
onChange={handleChange}
/>

</div>
<div className="form-options">

<label className="remember">

<input
type="checkbox"
checked={showPassword}
onChange={() => setShowPassword(!showPassword)}
/>

Show Password

</label>

</div>
<button
type="submit"
disabled={loading}
className="login-btn"
>

{loading ? "Creating Account..." : "Register"}

</button>
<div className="register-section">

<p>
Already have an account?
</p>

<a href="/login">
Login Here
</a>

</div>



</form>


</div>


</div>


)

}


export default Register;