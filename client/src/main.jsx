import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './routes/homePages/homePages.jsx';
import CreatePage from './routes/createPages/createPage.jsx';
import PostPage from './routes/postPage/postPage.jsx';
import ProfilePage from './routes/profilePages/profilePages.jsx';
import SearchPage from './routes/searchPages/searchPages.jsx'; 
import MainLayout from './routes/layout/layout.jsx';
import AuthPage from './routes/authPages/authPages.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="pin/:id" element={<PostPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

