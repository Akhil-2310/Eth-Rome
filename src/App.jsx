import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GroupForm from "./pages/GroupForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<GroupForm />} />
          {/* <Route path="/list" element={<ListProducts />} />
          <Route path="/my" element={<MyProducts />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
