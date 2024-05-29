import Home from "./pages/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
