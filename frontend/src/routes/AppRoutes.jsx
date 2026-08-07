import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recommendations from '../pages/Recommendations';
import Students from '../pages/Students';
import Courses from '../pages/Courses';
import About from '../pages/About';
import Teachers from '../pages/Teachers';
import Skills from '../pages/Skills';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/about" element={<About />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="*" element={<div className="container py-5"><h4>404 - Page Not Found</h4></div>} />
    </Routes>
  );
}  
