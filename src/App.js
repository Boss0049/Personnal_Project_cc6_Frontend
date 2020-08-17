import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import PrivateRoute from "./containers/private-router/PrivateRoute";
import LocalStorage from "./services/LocalStorageService";
import Navbar from "./components/menu/Navbar";
import Card from "./components/Card";
import { PostContextProvider } from "./context/PostContext";

function App() {
  const [role, setRole] = useState(LocalStorage.checkToken());

  return (
    <div style={{ height: "100vh" }}>
      <PostContextProvider>
        <Navbar role={role} setRole={setRole}></Navbar>
        <PrivateRoute role={role} setRole={setRole}></PrivateRoute>
      </PostContextProvider>
    </div>
  );
}
export const SubmitContext = React.createContext("");
export default App;
