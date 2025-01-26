import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" index element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
