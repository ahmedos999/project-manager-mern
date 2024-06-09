import Home from "./pages/Home";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={user?<Home></Home>:<Navigate to='login'></Navigate>}></Route>
        <Route path="/login" element={!user?<Login/>:<Navigate to='/'></Navigate>}></Route>
        <Route path="/signup" element={!user?<Signup/>:<Navigate to='/'></Navigate>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
