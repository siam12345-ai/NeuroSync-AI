import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import "../App.css";

function MainLayout({ children }) {
const location = useLocation();

const titles = {

"/dashboard":"🏠 Dashboard",

"/scan":"🧠 Brain Scan",

"/analytics":"📊 Analytics",

"/history":"📜 History",

"/profile":"👤 Profile"

};
  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

<div className="page-header">

<h1>

{titles[location.pathname]}

</h1>

<p>

NeuroSync AI Intelligent Cognitive Platform

</p>

</div>

{children}

</main>

    </div>

  );

}

export default MainLayout;