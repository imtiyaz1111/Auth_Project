
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App() {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element={ <Home/>}/>
  <Route path="/login" element={ <Login/>}/>
  <Route path="/signin" element={ <SignIn/>}/>
  </Routes>
  </BrowserRouter>

  </>
  );
}

export default App;
