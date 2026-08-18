
import "../App.css";
import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";


function Login(){


const navigate = useNavigate();



const [form,setForm] = useState({

email:"",
password:""

});
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");


 
const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};



const handleSubmit=async(e)=>{
    e.preventDefault();
    const newErrors = {};

if (!form.email.trim()) {

newErrors.email = "Email is required.";

}

else if (

!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

) {

newErrors.email = "Invalid email address.";

}

if (!form.password) {

newErrors.password = "Password is required.";

}

else if (form.password.length < 6) {

newErrors.password =

"Password must be at least 6 characters.";

}

if (Object.keys(newErrors).length > 0) {

setErrors(newErrors);

return;

}

setErrors({});

e.preventDefault();

if(!form.email || !form.password){

alert("Please fill all fields");

return;

}

try{
    setLoading(true);


const res = await API.post("/auth/login",form);





localStorage.setItem(
"user",
JSON.stringify(res.data.data.user)
);

localStorage.setItem(
"token",
res.data.data.token
);
setMessage("✅ Login Successful");


// Dashboard redirect

navigate("/dashboard");


}



catch(error){

setMessage(

error.response?.data?.message ||

"Login Failed"

);

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
Welcome Back
</h2>

<p className="login-text">
Sign in to continue your learning journey.
</p>

</div>
{message && (

<div className="login-message">

{message}

</div>

)}

<form
onSubmit={handleSubmit}
autoComplete="on"
>

<div className="form-group">

<label>Email Address</label>

<input
type="email"
name="email"
placeholder="Enter your email"
autoComplete="email"
value={form.email}
onChange={handleChange}
/>
{errors.email && (

<p className="form-error">

{errors.email}

</p>

)}

</div>

<div className="form-group">

<label>Password</label>

<input

type={showPassword ? "text" : "password"}
name="password"
placeholder="Enter your password"
autoComplete="current-password"
value={form.password}
onChange={handleChange}
/>
{errors.password && (
  <p className="form-error">
    {errors.password}
  </p>
)}
<div className="show-password">

<label>

<input
type="checkbox"
checked={showPassword}
onChange={() => setShowPassword(!showPassword)}
/>


Show Password

</label>

</div>

</div>

<div className="form-options">

<label className="remember">

<input
type="checkbox"
name="remember"
/>

<span>Remember Me</span>

</label>

<a
href="#"
className="forgot-password"
>

Forgot Password?

</a>

</div>

<button
type="submit"
disabled={loading}
className="login-btn"
>

{loading ? (

<span className="loading-content">

<span className="spinner"></span>

Logging in...

</span>

) : (

"Login"

)}

</button>

</form>

<div className="register-section">

<p>

Don't have an account?

</p>

<a href="/register">

Create Account

</a>

</div>

</div>

</div>

)

}

export default Login;