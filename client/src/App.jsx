import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ArticleGenerator from "./pages/ArticleGenerator.jsx";
import Titles from "./pages/Titles.jsx";
import ImageGenerator from "./pages/ImageGenerator.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObject from "./pages/RemoveObject.jsx";
import ResumeHelper from "./pages/ResumeHelper.jsx";
import Community from "./pages/Community.jsx";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<UserDashboard />} />
          <Route path="article-generator" element={<ArticleGenerator />} />
          <Route path="title-generator" element={<Titles />} />
          <Route path="image-generator" element={<ImageGenerator />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="resume-helper" element={<ResumeHelper />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
