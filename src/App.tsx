import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Views
import Default from "./views/Default";

// Screens
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Learn from "./screens/Learn";
import Game1 from "./screens/Games/Game1";
import Settings from "./screens/Settings";
import Test from "./screens/Test";

// Components
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Default>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="learn" element={<Learn />} />
            <Route path="game/1" element={<Game1 />} />
            <Route path="settings" element={<Settings />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </Default>
      </BrowserRouter>
    </div>
  );
}

export default App;
