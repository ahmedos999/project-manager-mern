import Home from "./pages/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/authContext";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={!user?<Login/>:<Home></Home>}></Route>
      </Routes>
      <Routes>
        <Route path="/signup" element={!user?<Signup/>:<Home></Home>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
