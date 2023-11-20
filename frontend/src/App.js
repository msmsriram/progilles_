import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Calculator from "./Calculator";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Calculator} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
