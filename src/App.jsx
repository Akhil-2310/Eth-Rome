import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GroupForm from "./pages/GroupForm";
import AllGroups from "./pages/AllGroups";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<GroupForm />} />
          <Route path="/all" element={<AllGroups />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
