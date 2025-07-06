import React from "react";
import "../../styles/home.css";

import Footer from "./Footer";
import Hero from "./Hero";
import SecondHero from "./SecondHero";
import Navbar from "./Navbar";
import Header from "./Header";
import ProductCarousel from "./ProductCarousel";
import Faculty from "./Faculty";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main Content */}
      <main id="main-box" className="flex-1 bg-white h-full">
        {/* You can add main content here */}
        <Hero />
        <SecondHero />
        <ProductCarousel />
        <Faculty />
      </main>
      <Footer />
      
    </div>
  );
}
