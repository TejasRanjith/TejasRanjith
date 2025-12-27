import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import CategoryProjects from './pages/CategoryProjects';
import ProjectDetails from './pages/ProjectDetails';

import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
              <Outlet context={{ isDarkMode, setIsDarkMode }} />
            </Layout>
          }
        >
          <Route index element={<Home />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="category/:category" element={<CategoryProjects />} />
          <Route path="project/:title" element={<ProjectDetails />} />
          {/* Fallback to Home or 404 */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
