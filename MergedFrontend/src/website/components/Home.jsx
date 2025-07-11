import React from "react";
import "../../styles/home.css";

import Footer from "./Footer";
import Hero from "./Hero";
import SecondHero from "./SecondHero";
import Navbar from "./Navbar";
import Header from "./Header";
import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router-dom";

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
        
        {/* Faculty Section Preview */}
        <div className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Faculty</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
              Meet our dedicated team of professionals committed to excellence in education and student success.
            </p>
            <div className="text-center">
              <Link 
                to="/faculty" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                View All Faculty
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
    </div>
  );
}
