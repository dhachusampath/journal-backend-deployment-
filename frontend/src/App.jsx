import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import CareerPage from "./pages/CareerPage";
import GoogleSuccess from "./pages/GoogleSuccess";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/newspage" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/career" element={<CareerPage />} />
       <Route path="/google-success" element={<GoogleSuccess />} />
        </Routes>
    </div>
  );
};

export default App;
