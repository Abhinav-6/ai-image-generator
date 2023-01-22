import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <BrowserRouter>
      <header className="full flex justify-between items center border-b bg-white border-b-[#e6ebf4] px-8 py-4 md:px-4">
        <Link to="/">
          <img src="/vite.svg" alt="logo" />
        </Link>
        <Link
          to="create-post"
          className="px-4 py-2 font-inter bg-[#6469ff] font-medium rounded text-white"
        >
          Create
        </Link>
      </header>
      <main className="p-8 md:px-4 md:py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
