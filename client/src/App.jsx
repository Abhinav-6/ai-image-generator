import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <header className="full flex justify-between items center border-b bg-white border-b-[#e6ebf4] px-4 py-4 md:px-8 ">
        <Link to="/">
          <img src="/vite.svg" alt="logo" />
        </Link>
      </header>
      <main className="p-8 md:px-4 md:py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
