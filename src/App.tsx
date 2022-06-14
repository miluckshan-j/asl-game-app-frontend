import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Screens
import Home from "./screens/Home";
import Learn from "./screens/Learn";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Settings from "./screens/Settings";
import Test from "./screens/Test";

// Components
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="settings" element={<Settings />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
