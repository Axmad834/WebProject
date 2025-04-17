import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Contact } from "./routes/Contact";
import { Courses } from "./routes/Courses";
import { Login } from "./routes/Login";
import Profile from "./routes/Profile";
import { Signup } from "./routes/Signup"; // Импортируем компонент профиля


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
