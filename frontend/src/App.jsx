import {BrowserRouter, Routes, Route} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layout/MainLayout";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import BrainScan from "./pages/BrainScan";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";



function App(){


return(


<BrowserRouter>


<Routes>



{/* Public Pages */}


<Route
path="/"
element={<Home/>}
/>



<Route
path="/login"
element={<Login/>}
/>



<Route
path="/register"
element={<Register/>}
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword/>}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword/>}
/>




{/* Dashboard */}


<Route

path="/dashboard"

element={

<ProtectedRoute>

<MainLayout>

<Dashboard/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* Brain Scan */}


<Route

path="/scan"

element={

<ProtectedRoute>

<MainLayout>

<BrainScan/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* Analytics */}


<Route

path="/analytics"

element={

<ProtectedRoute>

<MainLayout>

<Analytics/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* History */}


<Route

path="/history"

element={

<ProtectedRoute>

<MainLayout>

<History/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* Profile */}


<Route

path="/profile"

element={

<ProtectedRoute>

<MainLayout>

<Profile/>

</MainLayout>

</ProtectedRoute>

}

/>




</Routes>


</BrowserRouter>


)

}



export default App;