// import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar"
import { Outlet } from "react-router-dom";



function App() {
  return <>
    <Navbar/>
    <Outlet/>
  </>
}

export default App;