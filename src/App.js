import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Notfound, Ranking, Search } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
