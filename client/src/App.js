import logo from "./logo.svg";
import "./App.css";
import { UploadExel } from "./Components/UploadExel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DisplayData } from "./Components/DisplayData";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/bulk-upload" element={<UploadExel />} />
          <Route path="/data" element={<DisplayData />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
