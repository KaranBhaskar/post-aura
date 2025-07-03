import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Community from './pages/Community.jsx';
import Layout from './pages/Layout.jsx';
import ResumeHelper from './pages/ResumeHelper.jsx';
import ArticleGenerator from './pages/ArticleGenerator.jsx';
import UserDashboard from './pages/UserDashboard.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/layout" element={<Layout/>}/> 
        <Route path="/resume-helper" element={<ResumeHelper/>}/>
        <Route path="/article-generator" element={<ArticleGenerator/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>  
      </Routes>
    </div>
  );
};

export default App;