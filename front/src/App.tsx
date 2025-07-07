import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePhotoPage from "./pages/SinglePhotoPage";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      
        <Navbar />
        <div className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/photo/:id" element={<SinglePhotoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
