import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

// Redux
import type { RootState } from "./redux/store";

// Views
import Default from "./views/Default";

// Screens
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Learn from "./screens/Learn";
import Game1 from "./screens/Games/Game1";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import Test from "./screens/Test";

// Components
import Header from "./components/Header";
import GuardedRoute from "./components/GuardedRoute";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Default>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/game/1" element={<Game1 />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/profile"
              element={
                <GuardedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </GuardedRoute>
              }
            />
            <Route path="test" element={<Test />} />
          </Routes>
        </Default>
      </BrowserRouter>
    </div>
  );
}

export default App;
