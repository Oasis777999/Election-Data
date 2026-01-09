import "./App.css";
import { UploadExel } from "./Components/UploadExel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DisplayData } from "./Components/DisplayData";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import UserList from "./Components/Pages/UserList";
import AddUser from "./Components/Pages/AddUser";
import EditUser from "./Components/Pages/EditUser";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/bulk-upload" element={<UploadExel />} />
          <Route path="/data" element={<DisplayData />} />
          <Route path="/login" element={<Login />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
