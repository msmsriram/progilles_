import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Calculator from "./Calculator";
import Login from "./User/pages/Login";
import Register from "./User/pages/Register";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/calculate" Component={Calculator} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
